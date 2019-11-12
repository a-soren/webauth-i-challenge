const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users_model.js');

// Register POST request

router.post('/register', (req,res) => {
    let userCredentials = req.body;

    bcrypt.hash(userCredentials.password, 14, (err, hashedPassword)=> {
        userCredentials.password = hashedPassword;

        Users.add(userCredentials)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    });
});

// Login POST request

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = user.username;
            res.status(200).json({
                message:`Welcome ${user.username}!`
            });
        } else {
            res.status(401).json({
                message: ' Invalid Credentials'
            });
        }
    })
    .catch(error => {
        console.log('Login Error', error);
        res.status(500).json(error);
    });
});

router.get('/logout', (req, res) =>{
    if (req.session){
        res.session.destroy(error => {
            if (error) {
                res.status(500).json({
                    message:'unable to log out'
                });
            }
        });
        res.status(200).json({
            message:'you are logged out'
        });
    } else {
        res.status(200).json({
            message:'you are already logged out'
        });
    }
});

module.exports = router;