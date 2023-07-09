const express = require("express");
const db = require("./routes/db-config");
const app = express();
const cookie = require("cookie-parser");
const cookieParser = require("cookie-parser");
const { upload } = require("./s3Config");
const port = process.env.PORT || 5000;

app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser());
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));

app.get("/upload", async (req, res) => {
  const filename = req.query.filename;
  const contentType = req.query.contentType;
  const url = putObject(filename, contentType);
  console.log(res.send({ url }));
  console.log(url);
});

// app.get("/list", async (req, res) => {
//   let r = await S3.listObjectV2({ Bucket: "pixelstreamings3" }).promise;
//   let x = r.Contents.map((e) => e.Key);
//   res.send(x);
// });

// app.get("/download/:filename", async (req, res) => {
//   const fileName = req.params.filename;
//   await S3.getObject({
//     Bucket: "pixelstreamings3",
//     Key: fileName,
//   }).promise();

//   res.send(x.body);
// });

// app.delete("/delete/:filename", async (req, res) => {
//   const fileName = req.params.filename;
//   await S3.deleteObject({
//     Bucket: "pixelstreamings3",
//     Key: fileName,
//   }).promise();

//   res.send("Deleted");
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
