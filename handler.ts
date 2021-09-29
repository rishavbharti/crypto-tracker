import * as aws from "aws-sdk";
const CoinGecko = require("coingecko-api");

aws.config.loadFromPath("./config.json");

var docClient = new aws.DynamoDB.DocumentClient();
const CoinGeckoClient = new CoinGecko();

const TABLE_NAME = "SkrBootstrap-CryptoPortfolioTracker-rishav-UserTable";

function response(statusCode: number, message: any) {
    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify(message),
    };
}

async function fetchCoinsPrice(assets: any) {
    const assetIds = Object.keys(assets).map((asset) =>
        asset.toLowerCase().replace(/\s+/g, "-")
    );

    return await CoinGeckoClient.simple.price({ ids: assetIds });
}

export const handle = async (event: any, context: any) => {
    const username = event.queryStringParameters?.username;

    if (!username) {
        return response(400, {
            error: "Username must be present in the query params",
        });
    }

    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
            ":username": username,
        },
    };

    // let coinsData = await CoinGeckoClient.coins.list();

    return docClient
        .query(params)
        .promise()
        .then((res) => {
            const { Count, Items } = res;
            let responseData: any[] = [];

            if (Count === 0 || !Items[0].assets) {
                responseData = [];
            } else {
                const assets = Items[0].assets;

                let assetNameIdMapping: any = {};

                Object.keys(assets).forEach((asset) => {
                    const id = asset.toLowerCase().replace(/\s+/g, "-");
                    assetNameIdMapping[id] = asset;
                    assetNameIdMapping[asset] = id;
                });

                return fetchCoinsPrice(assets).then((res) => {
                    let coinsPrice = res.data;

                    responseData = Object.keys(assets).map((asset) => {
                        const assetName = assets[asset];
                        const assetId = coinsPrice[assetNameIdMapping[asset]]; // Get id based on name

                        return {
                            token: asset,
                            quantity: assetName["quantity"],
                            totalValue: Math.round(
                                assetId["usd"] * assetName["quantity"]
                            ),
                            price: assetId["usd"].toFixed(2),
                        };
                    });

                    const totalAssetValue = responseData.reduce(
                        (sum, asset) => sum + +asset.totalValue,
                        0
                    );

                    responseData.forEach(
                        (asset) =>
                            (asset.allocation = Math.round(
                                (asset.totalValue / totalAssetValue) * 100
                            ))
                    );

                    return response(200, responseData);
                });
            }
        })
        .catch((err) => {
            console.log(err);
            return response(err.statusCode, err);
        });
};
