const bcrypt = require('bcryptjs');

const Users = require('../users/users_model.js');

module.exports = (req, res, next) => {
    let { username, password } = req.headers;

    if (username && password) {
        Users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({
                    message:'Invalid Credentials'
                });
            }
        })
        .catch(error => {
            console.log('Login Error', error);
            res.status(500).json({
                message:'Please Try Again Later'
            });
        });
    } else {
        res.status(400).json({
            message:'Please Provide your Credentials'
        });
    }
};