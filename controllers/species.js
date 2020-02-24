const models = require("../models");
const species = models.species;

exports.speciesadd = (req, res) => {
  species.create(req.body).then(addstatus => {
    res.send({
      message: "sukses",
      addstatus
    });
  });
};

exports.species = (req, res) => {
  species.findAll().then(showall => {
    res.send(showall);
  });
};
