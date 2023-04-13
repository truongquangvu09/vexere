const { User } = require("../models/index");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUSer = async (req, res) => {
  const { name, email, password, numberphone, type } = req.body;
  try {
    //tao ra 1 chuoi ngau nhien
    const salt = bcryptjs.genSaltSync(10);

    //ma hoa chuoi ngau nhien vua tao ra salt + password
    const hashPassword = bcryptjs.hashSync(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      numberphone,
      type,
    });
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userList = await User.findAll();
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const userDetail = await User.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(userDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUsers = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, numberphone, typep } = req.body;
  try {
    const userDetail = await User.findOne({
      where: {
        id,
      },
    });
    userDetail.name = name;
    userDetail.email = email;
    userDetail.password = password;
    userDetail.numberphone = numberphone;
    userDetail.typep = typep;

    res.status(200).send(userDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userdeleted = await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("xoa thanh cong");
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password ,type} = req.body;
  //b1.tim user dang dap nhap bang email
  const user = await User.findOne({
    where: {
      email,
    },
  });
  console.log(user.email);
  if (user) {
    //b2.kiem tra mat khau chinh xac hay khong
    const token = jwt.sign({email: user.email, type:user.type},"tokenok",{expiresIn:60 * 60})
    const isAuth = bcryptjs.compareSync(password, user.password);
    if (isAuth) {
      res.status(200).send({ message: "dang nhap thanh cong",token });
    } else {
      res.status(500).send({ message: "dang nhap that bai" });
    }
  } else {
    res.status(500).send({ message: "khong tim thay nguoi dung" });
  }
};

module.exports = {
  createUSer,
  getAllUsers,
  getDetailUsers,
  updateUsers,
  deleteUser,
  login,
};
