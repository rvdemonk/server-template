const userRepository = require("../repositories/userRepository");

const createUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  // Here, you would hash the password before saving. Skipping for brevity.
  const user = await userRepository.createUser(username, password);
  ctx.body = user;
};

const getAllUsers = async (ctx) => {
  const users = await userRepository.getAllUsers();
  ctx.body = users;
};

module.exports = {
  createUser,
  getAllUsers,
};
