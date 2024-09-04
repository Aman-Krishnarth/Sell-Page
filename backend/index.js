const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const conf = require("./conf/conf");
const fs = require("fs");
const book = require("./models/book");
require("./db/connectToDb");

//cloudinary
cloudinary.config({
  cloud_name: conf.cloudName,
  api_key: conf.apiKey,
  api_secret: conf.apiSecret,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is working perfectly fine");
});

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//file upload
app.post("/upload", upload.array("file", 10), async (req, res) => {
  console.log("");
  console.log("req.body hai bro");
  console.log(req.body);
  console.log(JSON.parse(req.body.bookDetails));
  // console.log(name, email);

  const {
    name,
    address,
    author,
    language,
    publisher,
    publicationDate,
    mrp,
    retailPrice,
    discountedPrice,
  } = JSON.parse(req.body.bookDetails);

  const images = req.files;
  console.log("images waala log");
  console.log(images);
  const imageUrls = [];

  for (const image of images) {
    const result = await cloudinary.uploader.upload(image.path).catch((err) => {
      console.log("cloudinary upload mein error".toUpperCase());
    });
    fs.unlink(image.path, (err) => {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file: example_file.txt");
      }
    });
    imageUrls.push(result.secure_url);
  }

  console.log(imageUrls);

  await book.create({
    coverUrls: imageUrls,
    name,
    address,
    author,
    language,
    publisher,
    publicationDate,
    mrp,
    retailPrice,
    discountedPrice,
  });

  res.status(200).json({
    success: true,
    message: "BOOK added successfully",
    imageUrls,
  });
});

app.get("/buyBooks", async (req, res) => {
  const books = await book.find({});
  res.send(books);
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
