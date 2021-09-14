import * as aws from "aws-sdk";
import * as crypto from "crypto";

aws.config.loadFromPath("./config.json");

var docClient = new aws.DynamoDB.DocumentClient();

const TABLE_NAME = "SkrBootstrap-CryptoPortfolioTracker-rishav-UserTable";

type User = {
    username: string;
    email: string;
    password: string;
};

type Params = {
    TableName: string;
    Item: User;
};

const registerUser = (params: Params) => {
    return docClient.put(params).promise();
};

export const handle = async (event: any, context: any) => {
    const { body, httpMethod } = event;

    if (httpMethod !== "POST") {
        return {
            statusCode: 405,
        };
    }

    let userData: User;

    try {
        userData = JSON.parse(body);

        if (
            !userData ||
            !userData.hasOwnProperty("username") ||
            !userData.username ||
            !userData.hasOwnProperty("email") ||
            !userData.email ||
            !userData.hasOwnProperty("password") ||
            !userData.password
        ) {
            return {
                statusCode: 400,
            };
        }

        userData.password = crypto
            .createHash("sha256")
            .update(userData.password)
            .digest("hex");

        await registerUser({
            TableName: TABLE_NAME,
            Item: userData,
        });
    } catch (error) {
        console.log("error => ", error);

        return {
            statusCode: 503,
        };
    }

    return {
        statusCode: 201,
        headers: {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify("User registered successfully."),
    };
};
