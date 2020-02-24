const jwt = require("jsonwebtoken");
const models = require("../models");

const Pet = models.pet;
const User = models.users;

exports.register = (req, res) => {
  try {
    const { breednder, email, password, phone, address } = req.body;
    // const { name, gender, about_pet } = req.body.pet;
    User.findOne({ where: { email } }).then(Email => {
      if (!Email) {
        User.create({
          breednder: breednder,
          email: email,
          password: password,
          phone: phone,
          address: address
        }).then(user => {
          Pet.create({
            name: req.body.pet.name,
            gender: req.body.pet.gender,
            about_pet: req.body.pet.about_pet,
            photo: req.body.pet.photo,
            id_species: req.body.pet.species.id,
            id_user: user.id,
            id_ages: req.body.pet.age.id
          }).then(pet => {
            const token = jwt.sign({ userId: user.id }, "my-secret-key");
            res.status(200).send({
              status: 200,
              message: "success",
              email: User.email,
              token
            });
          });
        });
      } else {
        res.status(201).send({
          status: 201,
          message: "email is already in use",
          data: req.body
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      email: "unique",
      password: "unique",
      message: "Bad Request",
      data: req.body
    });
  }
};
