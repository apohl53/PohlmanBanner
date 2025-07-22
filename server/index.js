const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads")); // serve static images

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
const upload = multer({ storage });

let photos = [];

app.post("/upload", upload.single("photo"), (req, res) => {
  const photoUrl = `/uploads/${req.file.filename}`;
  photos.push(photoUrl);
  res.json({ url: photoUrl });
});

app.get("/photos", (req, res) => {
  res.json(photos);
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
