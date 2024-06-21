const userController = require("../controllers/userController");

const userRoutes = (router) => {
  router.post("/users", userController.createUser);
  router.get("/users", userController.getAllUsers);
};

module.exports = userRoutes;
