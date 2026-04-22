let mysql = require("mysql")

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "worldspader",
    connectionLimit: 10
});

const user_exist = async (mail) => {
    let statement = `SELECT COUNT(user_id) as nb from Users WHERE email = ?`

    return new Promise((resolve, reject) => {
        pool.query(statement, [mail], (err, res, fields) => {
            if (err) return reject(err);

            resolve(res[0].nb > 0)
        })
    })
}

module.exports = { pool , user_exist }