const express = require("express");
const ROUTER = express.Router();
const db = require("../tools/database");
const format = require("../tools/format");

ROUTER.get("/health", (req, res) => {
  res.status(200).json({ State: "Perfect" });
});

ROUTER.post("/inscription", async (req, res) => {
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let username = req.body.username;
  let mail = req.body.mail;
  let pwd = req.body.pwd;

  let user_mail_exist = await db.user_mail_exist(mail);
  let user_name_exist = await db.user_name_exist(username);

  if (
    format.check_input_inscription(
      first_name,
      last_name,
      username,
      mail,
      pwd,
    ) == false
  ) {
    res.status(400).json({ Error: "Les données ne sont pas bien formaté" });
  } else if (user_mail_exist && !user_name_exist) {
    res 
      .status(400)
      .json({ success: false, Error: "L'adresse mail est déjà utiliser" });
  } else if (user_name_exist && !user_mail_exist) {
    res
      .status(400)
      .json({ success: false, Error: "L'username est déjà utiliser" });
  } else if (user_name_exist && user_mail_exist) {
    res.status(400).json({
      success: false,
      Error: "L'email et l'username sont déjà utiliser.",
    });
  } else {
    let user_created = await db.create_user(
      first_name,
      last_name,
      username,
      mail,
      pwd,
    );

    if (user_created) {
      res
        .status(200)
        .json({ success: true, State: "Utilisateur Créer avec succès" });
    } else {
      res.status(400).json({
        success: false,
        Error: "L'utilisateur ne peux pas être créer",
      });
    }
  }
});

ROUTER.post("/connexion", async (req, res) => {
  mail = req.body.mail;
  pwd = req.body.pwd;

  let can_connect = await db.can_connect(mail, pwd)

  if (can_connect) {
    let user_data = await db.get_user_data(mail, pwd)

    res.status(200).json({success: true, user:user_data})
  }
  else{
    res.status(400).json({success: false, Error: "No user with this information can be found"})
  }

});

module.exports = ROUTER;
