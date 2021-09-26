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
    const { body } = event;
    const reqBody = JSON.parse(body);

    if (!reqBody.username || !reqBody.token || !reqBody.quantity) {
        return response(400, {
            error: "Request must have a username, token, and quantity",
        });
    }

    const { username, token, quantity } = reqBody;

    /**
     * 1. [To-do] Validate username
     * 2. Update the quantity if token already exists
     * 3. Create a new token if it doesn't exist
     */

    const assetData = {
        [token]: {
            quantity: quantity,
        },
    };

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
            const assets = res.Items?.[0]?.assets || {};

            let params = {
                Key: {
                    username: username,
                },
                TableName: TABLE_NAME,
                UpdateExpression: "SET assets=:a",
                ExpressionAttributeValues: {
                    ":a": { ...assets, ...assetData },
                },
                ReturnValues: "UPDATED_NEW",
            };

            return docClient
                .update(params)
                .promise()
                .then((res) => response(200, res.Attributes))
                .catch((err) => {
                    console.log(err);
                    response(err.statusCode, err);
                });
        })
        .catch((err) => {
            console.log(err);
            response(err.statusCode, err);
        });
};
