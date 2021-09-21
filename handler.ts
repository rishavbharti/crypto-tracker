import * as aws from "aws-sdk";
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

aws.config.loadFromPath("./config.json");

var docClient = new aws.DynamoDB.DocumentClient();

const TABLE_NAME = "SkrBootstrap-CryptoPortfolioTracker-rishav-UserTable";
const TOKEN_KEY = "skrbootstrap";

export const handle = async (event: any, context: any) => {
    const { body, httpMethod } = event;

    if (httpMethod !== "POST") {
        return {
            statusCode: 405,
        };
    }

    const request = JSON.parse(body);

    if (!request?.username || !request?.password) {
        return {
            statusCode: 400,
        };
    }

    const { username, password } = request;

    let response = await docClient
        .query({
            TableName: TABLE_NAME,
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username,
            },
        })
        .promise();
    // .then((data) => data)
    // .catch((err) => {
    //     error = JSON.stringify(err, null, 2);
    //     console.log(error);
    // });

    // if (error) {
    //     return {
    //         statusCode: 501,
    //         headers: {
    //             "Content-Type": "*/*",
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "*",
    //         },
    //         body: error,
    //     };
    // }

    if (!response.Count) {
        return {
            statusCode: 401,
        };
    }

    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    if (response.Items[0].password !== hashedPassword) {
        return {
            statusCode: 401,
        };
    }

    const token = jwt.sign({ username: username }, TOKEN_KEY, {
        expiresIn: "2h",
    });

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        body: token,
    };
};
