import * as aws from 'aws-sdk'

aws.config.loadFromPath('./config.json')

export const handle = async (event: any, context: any) => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        },
        body: "Hello!"
    }
};

