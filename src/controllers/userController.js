const userService = require("../services/userService");
const userRepository = require("../repositories/userRepository");

const createUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  console.log("adding" + username);
  const user = await userService.registerUser(username, password);
  console.log({ function: "create user service", value: user });
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
