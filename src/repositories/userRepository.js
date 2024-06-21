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

module.exports = {
  createUser, // existing function
  getAllUsers,
};
