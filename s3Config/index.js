const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

aws.config.update({
  region: "ap-south-1",
  secretAccessKey: "cMb+BnF5b0zqldoqYRhi3cKtWId98WRS706QY8ykh",
  accessKeyId: "AKIAX7WO7DTSAHFGPUBD",
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "pixelstreamings3",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

module.exports = { upload };
// const s3Client = new S3Client({
//   region: "ap-south-1",
//   credentials: {
//     accessKeyId: "AKIAX7WO7DTSLTJEXH3G",
//     secretAccessKey: "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",
//   },
// });

// async function putObject(filename, contentType) {
//   const command = new PutObjectCommand({
//     Bucket: "pixelstreamings3",
//     Key: `uploads/userUploads/${filename}`,
//     Contenttype: contentType,
//   });
//   const url = await getSignedUrl(s3Client, command);
//   return url;
// }

// async function init() {
//   //   console.log(
//   //     "url for Screenshot 2023-05-25 205843.png",
//   //     await getObjectURL("Screenshot 2023-05-25 205843.png")
//   //   );
//   console.log(
//     "URL for uploading",
//     await putObject(`image-${Date.now()}.jpeg`, "image/png")
//   );
// }

// init();
