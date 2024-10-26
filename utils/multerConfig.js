const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the destination folder based on the file type
    if (file.fieldname === "image") {
      cb(null, "public/images/");
    } else if (file.fieldname === "profile_photo") {
      cb(null, "public/images/");
    } else if (
      file.fieldname === "shortVideo" ||
      file.fieldname === "longVideo"
    ) {
      cb(null, "public/videos/");
    } else if (file.fieldname === "images") {
      cb(null, "public/images/");
    } else {
      cb(new Error("Invalid field name"), null);
    }
  },
  filename: (req, file, cb) => {
    // Create a unique filename based on current timestamp and original name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Create the multer instance with the storage configuration
const upload = multer({ storage });

// Export the upload instance for use in your routes
module.exports = upload;
