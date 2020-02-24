const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const models = require("../models");
const bcrypt = require("bcrypt");
const User = models.users;
const {
    secretKey
} = require("../config/secretKey");

// const email = req.body.email
// const password = req.body.password //use encryption in real world case!

exports.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            const authorize = bcrypt.compareSync(req.body.password, user.password);

            if (authorize) {
                const token = jwt.sign({
                    id: user.id
                }, secretKey);

                res.send({
                    id: user.id,
                    token
                });
            } else {
                res.status(401).send({
                    message: "Invalid username or email."
                });
            }
        } else {
            res.status(401).send({
                message: "Invalid username or email."
            });
        }
    });
};
//--------------------------------------------------------------------------------------lOGIN SENDIRI

// exports.login = (req, res) => {
//     //check if email and pass match in db tbl user
//     const email = req.body.email
//     const password = req.body.password //use encryption in real world case!
//     User.findOne({ where: { email, password } }).then(user => {
//         if (user) {
//             const token = jwt.sign({ userId: user.id }, 'my-secret-key')

//             res.send({
//                 email,
//                 token
//             })
//         } else {
//             res.send({
//                 error: true,
//                 message: "Wrong Email or Password!"
//             })
//         }
//     })
// }

exports.register = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const breednder = req.body.breednder;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address; //use encryption in real world case!

    User.create({
            breednder: breednder,
            email: email,
            password: hash,
            phone: phone,
            address: address,

        })
        .then(user => {
            if (user) {
                const token = jwt.sign({
                    id: user.id
                }, secretKey);

                const petData = {
                    name: req.body.pet.name,
                    gender: req.body.pet.gender,
                    id_species: req.body.spesies.id,
                    id_ages: req.body.ages.id

                };

                pet.create(petData).then(pet => {
                    if (pet) {
                        res.send({
                            email: email,
                            token
                        });
                    }
                })
            }
        })
        .catch(Sequelize.ValidationError, err => {
            return res.status(406).send({
                message: "Invalid username or email."
            });
        })
        .catch(err => {
            return res.status(400).send({
                message: err.message
            });
        });
};

//--------------------------------------------------------------------------------------REGIST SENDIRI

// exports.register = (req, res) => {
//     //check if email and pass match in db tbl user
//     const breednder = req.body.breednder
//     const email = req.body.email
//     const password = req.body.password
//     const phone = req.body.phone
//     const address = req.body.address //use encryption in real world case!
//     User.create({
//         breednder: breednder,
//         email: email,
//         password: password,
//         phone: phone,
//         address: address,
//     }).then(user => {
//         if (user) {
//             const token = jwt.sign({ password: user.password }, 'my-secret-key');
//             res.send({
//                 email: user.email,
//                 token
//             });
//         } else if (!breednder || !email || !password) {
//             res.send({
//                 email,
//                 token
//             })
//         }
//     })
// }