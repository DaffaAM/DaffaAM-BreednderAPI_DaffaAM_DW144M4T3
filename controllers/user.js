const model = require("../models");
const User = model.users;

//Get
exports.getuser = (req, res) => {
  const Id = req.params.id;
  User.findAll({ where: { Id } }).then(DetailUsers => {
    res.send({ DetailUsers });
  });
};

//Update User
exports.updateuser = (req, res) => {
  const id = req.params.id;
  const { name, address, phone } = req.body;
  const dataUp = { name, address, phone };
  User.update(dataUp, { where: { id: id } }).then(result => {
    if (result) {
      User.findOne({
        where: { id: id }
      }).then(Update => {
        res.send({ Message: "Success", Update });
      });
    }
  });
};

//Delete User
exports.deleteuser = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id } }).then(DelUser => {
    if (DelUser) {
      res.send({ message: "Success", DelUser });
    } else {
      res.send({ status: "404", message: "not found" });
    }
  });
};
