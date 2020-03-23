const express = require('express');
const projectsRouter = require('./projects/projectsRouter.js');
const actionsRouter = require('./actions/actionsRouter.js');

const server = express();

server.use(express.json());
server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Try /projects or /actions instead. DOH!</h2>`);
});

module.exports = server;