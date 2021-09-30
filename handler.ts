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

function handleDelete(username: string, token: string) {
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
            const assets = res.Items?.[0]?.assets;

            if (!assets[token]) {
                return response(400, {
                    error: "Token doesn not exist.",
                });
            }

            delete assets[token];

            let params = {
                Key: {
                    username: username,
                },
                TableName: TABLE_NAME,
                UpdateExpression: "SET assets=:a",
                ExpressionAttributeValues: {
                    ":a": { ...assets },
                },
                ReturnValues: "UPDATED_NEW",
            };

            return docClient
                .update(params)
                .promise()
                .then((res) => {
                    console.log(res);
                    return response(200, "Deleted");
                })
                .catch((err) => {
                    console.log(err);
                    return response(err.statusCode, err);
                });
        })
        .catch((err) => {
            console.log(err);
            return response(err.statusCode, err);
        });
}

export const handle = async (event: any, context: any) => {
    const { body } = event;
    const reqBody = JSON.parse(body);

    if (reqBody.action === "DELETE") {
        if (!reqBody.username || !reqBody.token) {
            return response(400, {
                error: "Request must have a username, token, and quantity",
            });
        }

        return handleDelete(reqBody.username, reqBody.token);
    }

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
                    return response(err.statusCode, err);
                });
        })
        .catch((err) => {
            console.log(err);
            return response(err.statusCode, err);
        });
};
