'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps'); // if this were deployed, save url in .env

// socket.emit('join', '1-206-flowers');

module.exports = socket;
