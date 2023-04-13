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

//upload files
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/avatars"); // set up cho can luu file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +"_"+ file.originalname); //dat lai ten cho file
  },
});
const upload = multer({ storage: storage });
userRouter.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  res.status(200).send("tinh nang run ok");
});
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getDetailUsers);
userRouter.post("/:id", updateUsers);
userRouter.delete("/:id", deleteUser);

module.exports = {
  userRouter,
};
