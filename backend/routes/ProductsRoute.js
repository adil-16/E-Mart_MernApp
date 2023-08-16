const { Router } = require("express");
const { getAllProducts, addProduct, getSingleProduct, deleteProduct } = require("../controllers/ProductController");
const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/addProduct", addProduct);
router.delete("/:id", deleteProduct);


module.exports = router;
