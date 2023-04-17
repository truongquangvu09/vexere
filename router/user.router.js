const express = require("express");
const {
  createUSer,
  getAllUsers,
  getDetailUsers,
  updateUsers,
  deleteUser,
  login,
  uploadAvatar,
  getAllTicket
} = require("../controller/user.controller");
const { User } = require("../models/index");

const { checkExist } = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorization } = require("../middlewares/auth/authorize");

const { uploadImage } = require("../middlewares/upload/upload-image");
const userRouter = express.Router();

userRouter.post("/register", createUSer);
userRouter.post("/login", login);

//upload files
userRouter.post("/upload-avatar",authenticate, uploadImage("users"), uploadAvatar);
userRouter.get("/all-ticket",getAllTicket)
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getDetailUsers);
userRouter.post("/:id", updateUsers);
userRouter.delete("/:id", deleteUser);
userRouter.get("/list-ticket",)


module.exports = {
  userRouter,
};
