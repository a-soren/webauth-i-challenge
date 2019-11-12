require('dotenv').config();
const server = require('./API/server.js');

const PORT = process.env.PORT || 7500;

server.listen(PORT, () => {
    console.log(`\n***Server Running on Port: ${PORT}***\n`)
});