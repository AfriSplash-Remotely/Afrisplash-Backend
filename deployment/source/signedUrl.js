import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_key,
})

const S3_BUCKET = process.env.s3_bucket;
const REGION ='YOUR_REGION';
const URL_EXPIRATION_TIME = 60; 

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

module.exports.handler = async (fileName , fileType) => {
      myBucket.getSignedUrl('putObject', {
        Key: fileName,
        ContentType: fileType,
        Expires: URL_EXPIRATION_TIME
    } , (err , url) => {
        return url // API Response Here
    });
}

// https://javascript.plainenglish.io/how-to-access-private-s3-buckets-securely-87778efd93bd
// https://www.npmjs.com/package/aws-sdk
// https://www.youtube.com/watch?v=JSR7U700h0U