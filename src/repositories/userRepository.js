const pool = require("../config/dbConfig");

const createUser = async (username, passwordHash) => {
  const result = await pool.query(
    "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *;",
    [username, passwordHash],
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query("SELECT id, username FROM users;");
  return result.rows;
};

const findUserByUsername = async (username) => {
  const query = "SELECT * from users WHERE username = $1";
  console.log(pool);
  const result = await pool.query(query, [username]);
  if (result.rows.length > 0) {
    return result.rows[0]; // Return the first user matching the username.
  } else {
    return null; // No user found with that username.
  }
};

module.exports = {
  createUser,
  getAllUsers,
  findUserByUsername,
};
