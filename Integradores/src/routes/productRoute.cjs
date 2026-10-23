const { Router } = require("express");
const { uploadPhoto } = require("../middlewares/upload.cjs");
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController.cjs");

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", uploadPhoto, createProduct);
router.put("/:id", uploadPhoto, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
