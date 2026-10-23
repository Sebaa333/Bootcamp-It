const path = require("node:path");
const crypto = require("node:crypto");
const multer = require("multer");

// Las fotos se guardan dentro de public/ para que /uploads/<archivo> las sirva.
const UPLOADS_DIR = path.join(__dirname, "..", "public", "uploads");

const IMAGE_EXT_RE = /\.(jpe?g|png|gif|webp|svg)$/i;

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomUUID()}${ext}`);
  }
});

function imagesOnly(req, file, cb) {
  const ok = file.mimetype.startsWith("image/") && IMAGE_EXT_RE.test(file.originalname);
  if (ok) {
    return cb(null, true);
  }
  const error = new Error("El archivo debe ser una imagen (jpg, jpeg, png, gif, webp o svg).");
  error.status = 400;
  cb(error);
}

const uploadPhoto = multer({
  storage,
  fileFilter: imagesOnly,
  limits: { fileSize: 2 * 1024 * 1024 }
}).single("photo");

module.exports = { uploadPhoto, UPLOADS_DIR };
