const express = require("express")
const ROUTER = express.Router();
const db = require("../tools/database")

ROUTER.get("/health", (req, res) => {
    res.status(200).json({ "State": "Perfect" })
})

ROUTER.get("/inscription", async (req, res) => {
    let user_already_exist = await db.user_exist("ndaunac@gmail.com")

    console.log(user_already_exist)

    if (!user_already_exist) console.log("L'utilisateur n'existe pas")
    else console.log("Un utilisateur avec cette e-mail existe déjà")



    res.status(200).json({ "State": "Comming Soon" })
})

module.exports = ROUTER