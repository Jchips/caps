'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps'); // if this were deployed, save url in .env

module.exports = socket;
