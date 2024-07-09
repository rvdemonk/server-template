import { registerUser } from "../services/userService.js";
import { getAllUsers } from "../repositories/userRepository.js";

export const createUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  console.log("adding" + username);
  const user = await registerUser(username, password);
  console.log({ function: "create user service", value: user });
  ctx.body = user;
};

export const fetchAllUsers = async (ctx) => {
  const users = await getAllUsers();
  ctx.body = users;
};
