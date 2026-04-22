const express = require("express")
const ROUTER = express.Router();

ROUTER.get("/health" , (req, res) => {
    res.status(200).json({"State" : "Perfect"})
})

module.exports = ROUTER