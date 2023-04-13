const authorization = (arrType) => (req, res, next) => {
  const {user} = req;
  if (arrType.findIndex((Element) => Element === user.type) > -1) {
    next();
  } else {
    res.status(403).send("ban da dang nhap nhung khong co quyen ");
  }
};

module.exports = {
  authorization,
};
