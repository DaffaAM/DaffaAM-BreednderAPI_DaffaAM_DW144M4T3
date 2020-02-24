const models = require("../models");
const Pet = models.pet;
const User = models.users;
const Species = models.species;
const Ages = models.ages;

// --- add pet
exports.Insert = (req, res) => {
  // const token = req.headers.authorization;
  //   const userId = req.body.user.id;
  //   const spesiesId = req.body.pet.species.id;
  //   const ageId = req.body.pet.ages.id;
  const dataPet = {
    name: req.body.name,
    gender: req.body.gender,
    about_pet: req.body.about_pet,
    photo: req.body.photo,
    id_user: req.body.user.id,
    id_species: req.body.species.id,
    id_ages: req.body.age
  };

  console.log(dataPet);
  Pet.create(dataPet).then(resPet => {
    User.findOne({ where: { id: req.body.user.id } }).then(userData => {
      Species.findOne({ where: { id: req.body.species.id } }).then(
        spesiesData => {
          Ages.findOne({ where: { id: req.body.age } }).then(ageData => {
            const resDataCok = {
              id: resPet.id,
              name: resPet.name,
              ageData,
              spesiesData,
              about_pet: resPet.aboutpet,
              photo: resPet.photo,
              userData
            };
            res.send({
              message: "Success",
              resDataCok
            });
          });
        }
      );
    });
  });
};

//Get All
exports.Getpet = (req, res) => {
  Pet.findAll({
    attributes: [
      "id",
      "name",
      "gender",
      "about_pet",
      "photo",
      "createdAt",
      "updatedAt"
    ],
    include: [
      { model: Species, attributes: ["name"] },
      { model: Ages, attributes: ["age"] },
      { model: User, attributes: ["id", "breednder", "address", "phone"] }
    ]
  }).then(pets => {
    res.send({ pets });
  });
};

//Update
exports.Updatepet = (req, res) => {
  const id = req.params.id;
  const { name, gender, about_pet, photo, species, age, user } = req.body;
  const data = {
    name,
    gender,
    about_pet,
    photo,
    species,
    age,
    user
  };

  console.log(data);
  Pet.update(data, { where: { id: id } }).then(DataPet => {
    // res.send({
    //   DataPet
    // });
    if (DataPet) {
      Pet.findOne({
        where: { id: id },
        include: [
          { model: Species, attributes: ["id", "name"] },
          { model: Ages, attributes: ["id", "age"] },
          { model: User, attributes: ["id", "breednder", "address", "phone"] }
        ]
      }).then(data => {
        res.send({
          data
        });
      });
    }
  });
};

//Delete
exports.ilang = (req, res) => {
  const Id = req.params.id;
  Pet.destroy({ where: { Id } }).then(Delpet => {
    if (Delpet) {
      res.send({
        message: "success",
        Delpet
      });
    } else {
      res.send({ status: "404", message: "not found" });
    }
  });
};

// Get Detail Pet
exports.getdetail = (req, res) => {
  const idPet = req.params.id;
  Pet.findOne({
    include: [
      {
        model: Species,
        attributes: ["id", "name"],
        as: "species"
      },
      {
        model: Ages,
        attributes: ["id", "age"],
        as: "age"
      },
      {
        model: User,
        attributes: ["id", "breednder", "address", "phone"],
        as: "user"
      }
    ],
    where: { id: idPet },
    attributes: [
      "id",
      "name",
      "gender",
      "about_pet",
      "photo",
      "createdAt",
      "updatedAt"
    ]
  }).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(400).send({
        error: true,
        message: "Pet success update, errror get data pet details"
      });
    }
  });
};
