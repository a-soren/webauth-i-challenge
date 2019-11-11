const server = require('./API/server.js');

const PORT = process.env.PORT || 6500;

server.listen(PORT, () => {
    console.log(`\n***Server Running on Port: ${PORT}***\n`)
});