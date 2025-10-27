const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Définir le stockage dynamique selon le champ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;

    if (file.fieldname === "cv") {
      uploadPath = path.join(__dirname, "..", "uploads", "cvs");
    } else if (file.fieldname === "image") {
      uploadPath = path.join(__dirname, "..", "uploads");
    } else {
      uploadPath = path.join(__dirname, "..", "uploads"); // fallback
    }

    // Crée le dossier s'il n'existe pas
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
