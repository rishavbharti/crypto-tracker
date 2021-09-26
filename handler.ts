import * as aws from "aws-sdk";

aws.config.loadFromPath("./config.json");

var docClient = new aws.DynamoDB.DocumentClient();

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

    return docClient
        .query(params)
        .promise()
        .then((res) => {
            const { Count, Items } = res;
            let responseData;

            if (Count === 0 || !Items[0].assets) {
                responseData = [];
            } else {
                responseData = Object.entries(Items[0].assets).map((asset) => {
                    return { token: asset[0], ...asset[1] };
                });
            }

            return response(200, responseData);
        })
        .catch((err) => {
            console.log(err);
            return response(err.statusCode, err);
        });
};
