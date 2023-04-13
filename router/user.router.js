const express = require("express");
const {
  createUSer,
  getAllUsers,
  getDetailUsers,
  updateUsers,
  deleteUser,
  login,
} = require("../controller/user.controller");
const { User } = require("../models/index");
const { checkExist } = require("../middlewares/validations/checkExist");
const userRouter = express.Router();

userRouter.post("/register", createUSer);
userRouter.post("/login", login);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getDetailUsers);
userRouter.post("/:id", updateUsers);
userRouter.delete("/:id", deleteUser);


module.exports = {
  userRouter,
};
