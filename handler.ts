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

export const handle = async (event: any, context: any) => {
    const { body, httpMethod } = event;

    if (httpMethod !== "POST") {
        return {
            statusCode: 405,
        };
    }

    let userData: User, response;

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
            throw new Error("Invalid request payload");
        }

        userData.password = crypto
            .createHash("sha256")
            .update(userData.password)
            .digest("hex");

        response = await registerUser({
            TableName: TABLE_NAME,
            Item: userData,
        });
        // console.log("response => ", response);
    } catch (error) {
        // console.log("error => ", error);

        return {
            statusCode: 400,
        };
    }

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify("Success"),
    };
};

const registerUser = (params: Params) => {
    return docClient.put(params, function (err, data) {
        if (err) {
            return "Unable to register user.";
        } else {
            return "User registered successfully.";
        }
    });
};
