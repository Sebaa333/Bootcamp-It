const path = require("node:path");
const express = require("express");
const cors = require("cors");
const productRoute = require("./routes/productRoute.cjs");
const contactRoute = require("./routes/contactRoute.cjs");
const { notFoundApi, errorHandler } = require("./middlewares/errors.cjs");

const PUBLIC_DIR = path.join(__dirname, "public");

const app = express();

app.use(cors());
app.use(express.json());

// Las fotos subidas no deben poder ejecutar scripts (por ejemplo un SVG abierto directo).
app.use("/uploads", (req, res, next) => {
  res.set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");
  res.set("X-Content-Type-Options", "nosniff");
  next();
});

// API
app.use("/api/products", productRoute);
app.use("/api/contacts", contactRoute);
app.use("/api", notFoundApi);

// Front: solo se publica src/public/ (index.html en "/").
app.use(express.static(PUBLIC_DIR));

app.use(errorHandler);

module.exports = app;
module.exports.PUBLIC_DIR = PUBLIC_DIR;
