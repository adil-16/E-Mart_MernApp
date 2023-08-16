const { Router } = require("express");
const { addOrder, getAllOrders, deleteOrder } = require("../controllers/OrderController");
const router = Router();

router.get("/", getAllOrders);
// router.get("/:id", getSingleProduct);
router.post("/addOrder", addOrder);
router.delete("/:id", deleteOrder);


module.exports = router;
