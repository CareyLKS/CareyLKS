const express = require("express");
const {
    addIncome,
    getAlIC,
    delIC,
    downICEx
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/add",protect,addIncome);
router.get("/get",protect,getAlIC);
router.get("/downloadexcel",protect,downICEx);
router.delete("/:id",protect,delIC);

module.exports =router;
