const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const env = require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function putObject(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: "pixelstreamings3",
    Key: `/${filename}`,
    Contenttype: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  console.log(
    "URL for uploading",
    await putObject(`image-${Date.now()}.jpeg`, "image/png")
  );
}

init();

// const s3Client = new S3Client({
//   region: "ap-south-1",
//   credentials: {
//     accessKeyId: "AKIAX7WO7DTSLTJEXH3G",
//     secretAccessKey: "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",
//   },
// });

// const s3 = new S3Client();

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "pixelstreamings3",
//     acl: "public-read",
//     key: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   }),
// });

// module.exports = { upload };

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
