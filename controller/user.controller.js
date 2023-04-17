const { User, sequelize } = require("../models/index");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const createUSer = async (req, res) => {
  const { name, email, password, numberphone, type } = req.body;
  try {
    //tao 1 avatar mac dinh
    const avatarUrl = gravatar.url("abc@gmail.com");

    //tao ra 1 chuoi ngau nhien
    const salt = bcryptjs.genSaltSync(10);

    //ma hoa chuoi ngau nhien vua tao ra salt + password
    const hashPassword = bcryptjs.hashSync(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      numberphone,
      avatar: avatarUrl,
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
  const { email, password, type } = req.body;
  //b1.tim user dang dap nhap bang email
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    //b2.kiem tra mat khau chinh xac hay khong
    const token = jwt.sign({ email: user.email, type: user.type }, "tokenok", {
      expiresIn: 60 * 60,
    });
    const isAuth = bcryptjs.compareSync(password, user.password);
    if (isAuth) {
      res.status(200).send({ message: "dang nhap thanh cong", token });
    } else {
      res.status(500).send({ message: "dang nhap that bai" });
    }
  } else {
    res.status(500).send({ message: "khong tim thay nguoi dung" });
  }
};

const uploadAvatar = async (req, res) => {
  const { file } = req;
  const urlImage = `http://localhost:3000/${file.path}`;
  const { user } = req;
  const userFounded = await User.findOne({
    email: user.email,
  });
  userFounded.avatar = urlImage;
  await userFounded.save();
  res.send(userFounded);
};

const getAllTicket = async (req, res) => {
  try {
    const [results] = await sequelize.query(
      `select u.name as user_name,fromSta.name as from_Station,toSta.name as to_Station from users u join tickets t on u.id= t.user_id
                  join trips tr on tr.id = t.trip_id
                            join stations as fromSta on fromSta.id = tr.fromStation
                            join stations as toSta on toSta.id = tr.toStation;
                            `
    );
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUSer,
  getAllUsers,
  getDetailUsers,
  updateUsers,
  deleteUser,
  login,
  uploadAvatar,
  getAllTicket,
};
