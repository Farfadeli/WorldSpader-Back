let mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "worldspader",
  connectionLimit: 10,
});

const user_mail_exist = async (mail) => {
  let statement = `SELECT COUNT(user_id) as nb from Users WHERE mail = ?`;

  return new Promise((resolve, reject) => {
    pool.query(statement, [mail], (err, res, fields) => {
      if (err) return reject(err);

      resolve(res[0].nb > 0);
    });
  });
};

const user_name_exist = async (username) => {
  let statement = "SELECT COUNT(user_id) as nb from Users WHERE username = ?";

  return new Promise((resolve, reject) => {
    pool.query(statement, [username], (err, res, fields) => {
      if (err) return reject(err);

      resolve(res[0].nb > 0);
    });
  });
};

const create_user = async (first_name, last_name, username, mail, pwd) => {
  let statement =
    "INSERT INTO users(first_name, last_name, username, mail, pwd) VALUES(?,?,?,?,?)";

  return new Promise((resolve, reject) => {
    pool.query(
      statement,
      [first_name, last_name, username, mail, pwd],
      (err, res) => {
        if (err) reject(res);

        resolve(true);
      },
    );
  });
};

const can_connect = async (mail, pwd) => {
  let statement =
    "SELECT count(user_id) as cd FROM users WHERE pwd = ? AND mail = ?";

  return new Promise((resolve, reject) => {
    pool.query(statement, [pwd, mail], (err, res, fields) => {
      if (err) reject(err);

      resolve(res[0].cd > 0);
    });
  });
};

const get_user_data = async (mail, pwd) => {
  let statement = "SELECT username, mail FROM users WHERE mail = ? AND pwd = ?";

  return new Promise((resolve, reject) => {
    pool.query(statement, [mail, pwd], (err, res) => {
      if (err) reject(err);

      console.log(`${res[0].username} - ${res[0].mail}`)

      resolve({ "username": res[0].username, "mail": res[0].mail });
    });
  });
};

module.exports = {
  pool,
  user_mail_exist,
  user_name_exist,
  create_user,
  can_connect,
  get_user_data,
};
