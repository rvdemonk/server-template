// src/services/userService.js
import {
  createUser,
  findUserByUsername,
} from "../repositories/userRepository.js";
import bcrypt from "bcryptjs";

export const registerUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      throw new Error("User already exists");
    }
    return await createUser(username, hashedPassword);
  } catch (error) {
    console.error(
      `Error creating user in userService.registerUser: ${error.message}`,
    );
    // Determine what to return based on the type of error.
    // This can be a generic error message, an error code, or a custom error object.
    // The specific response will depend on your application's requirements and error handling strategy.
    // For example:
    if (error.message === "User already exists") {
      // This could correspond to a 409 Conflict HTTP status code in your controller.
      return {
        error: true,
        message: "Username already taken",
        statusCode: 409,
        data: { username },
      };
    } else {
      // For unexpected errors, consider a generic response.
      // This could correspond to a 500 Internal Server Error HTTP status code in your controller.
      return {
        error: true,
        message: error.message,
        statusCode: 500,
      };
    }
  }
};
