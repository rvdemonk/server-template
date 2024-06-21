// src/services/userService.js
const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");

const registerUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const existingUser = await userRepository.findUserByUsername(username);
    if (existingUser) {
      throw new Error("User already exists");
    }
    return await userRepository.createUser(username, hashedPassword);
  } catch (error) {
    console.error(
      `Error creating user in userService.registerUser: ${error.message}`,
    );
   if (error.message === "User already exists") {
      return {
        error: true,
        message: "Username already taken",
        statusCode: 409,
        data: {username}
      };
    } else {
      return {
        error: true,
        message: error.message,
        statusCode: 500,
      };
    }
  }
};

module.exports = {
  registerUser,
};
