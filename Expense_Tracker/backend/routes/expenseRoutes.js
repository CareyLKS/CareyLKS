const express = require("express");
const {
    addExpense,
    getAlEx,
    delEx,
    downEx
} = require("../controllers/ExpController.js");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/add",protect,addExpense);
router.get("/get",protect,getAlEx);
router.get("/downloadexcel",protect,downEx);
router.delete("/:id",protect,delEx);

module.exports =router;
