import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_key,
})

const S3_BUCKET = process.env.s3_bucket;
const REGION = process.env.region;
const URL_EXPIRATION_TIME = 300; 

export const handler = (event, context, callback) => {
    const myBucket = new AWS.S3({
        params: { Key: event["queryStringParameters"]['fileName']},
        region: REGION,
    })
    myBucket.getSignedUrl('putObject', {
        Bucket: S3_BUCKET,
        // ContentType: event.fileType, 
        Expires: URL_EXPIRATION_TIME
    }, (err , url) => {
        if (err) {
            const response = {statusCode: 500, body: `Error: ${err}`}
            callback(err, JSON.stringify(response))
            return JSON.stringify(response)
        }
        else {
            const response = {
                statusCode: 200,
                headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
            body: `${url}`
        }
        callback(null, response)
        return response
    }     
    });
}
