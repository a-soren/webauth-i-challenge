const router = require('express').Router;
const bcrypt = require('bcryptjs');

const authRouter = require('../auth/authRouter.js');
const userRouter = require('../users/users_router.js');

router.use('/auth', authRouter);
router.use('/users', userRouter);

