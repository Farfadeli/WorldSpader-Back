const express = require("express");
const ROUTER = express.Router();
const db = require("../tools/database");

ROUTER.get("/getSims/:simID", async (req, res) => {
  const simID = req.params.simID;

  console.log(simID)

  const sim_exist = await db.check_exists(
    "SELECT COUNT(simulation_id) as nb FROM simulations where simulation_id = ?",
    [Number(simID)],
  );

  if (sim_exist == false) {
    res
      .status(400)
      .json({
        success: false,
        Error: "La simulation avec cette ID n'existe pas",
      });
  } else {
    const sim_data = await db.select(
      `SELECT users.username as username, simulation_name as simName , simulation_id as simID FROM simulations
             INNER JOIN users ON simulations.user_id = users.user_id
             WHERE simulation_id = ${Number(simID)}
            `,
    );

    console.log(sim_data)

    res
      .status(200)
      .json({
        success: true,
        username: sim_data[0].username,
        simulation_name: sim_data[0].simName,
        simulation_id: sim_data[0].simID,
      });
  }
});

ROUTER.post("/create", async (req, res) => {
  // Envoyer l'user ID et le nom de la simulation dans la requête
  const userID = req.body.user_id;
  const simName = req.body.sim_name;

  const create_world = await db.add_element(
    "INSERT INTO simulations(simulation_name, user_id) values(?, ?)",
    [simName, userID],
  );

  if (create_world) {
    res.status(200).json({
      success: true,
      Message: `La simulation ${simName} à été créer avec succès`,
    });
  } else {
    res.status(400).json({
      success: false,
      Message:
        "La simulation à racontré un problème inattendu, elle n'a pas pu être créer",
    });
  }
});

module.exports = ROUTER;
