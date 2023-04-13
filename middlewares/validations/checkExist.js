const { Station } = require("../../models/index");
const checkExist = (Model) => {
  return async (req, res, next) => {
    // kiem tra xem station co ton tai hay k ?
    const { id } = req.params;
    const station = await Model.findOne({
      where: {
        id,
      },
    });
    if (station) {
      next();
    } else {
      res.status(404).send(`khong tim thay station co id la ${id}`);
    }
  };
};

module.exports = {
  checkExist,
};
