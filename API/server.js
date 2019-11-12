const express = require('express');
const helmet =require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStorgae = require('connect-session-knex')(session);

const apiRouter = require ('./api-router.js');
const configMiddleware = require('./config-middleware.js');
const authRouter =require('../auth/authRouter.js');
const userRouter = require('../users/users_router.js');
const knexConnection = require('../database/dbConfig.js');

const server = express();
configMiddleware(server);
server.use('/api', apiRouter);

const sessionConfig = {
    name:'Ronin',
    secret: process.env.COOKIE_SECRET || 'is it secret?',
    cookie:{
        maxAge: 1000*60*60,
        secure: process.env.NODE_ENV==='development' ? false : true,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStorgae({
        knex: knexConnection,
        clearInterval: 1000 * 60 * 10,
        tablename:'Data Sessions',
        sidfieldname: 'id',
        createtable:true
    })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.json({
        api: 'up',
        session: req.session
    });
});
module.exports =server;