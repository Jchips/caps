'use strict';

require('dotenv').config();
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;
const server = new Server();
let date = new Date();

function logger(event, payload) {
  console.log('EVENT:', { event, time: date, payload });
}

const caps = server.of('/caps');
caps.on('connection', (socket) => {
  console.log('socket connected to caps namespace', socket.id);
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`joined the ${room} room`);
  });

  socket.onAny((event, payload) => logger(event, payload));

  socket.on('pickup', (payload) => {
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    caps.to('1-206-flowers').emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    socket.to('1-206-flowers').emit('delivered', payload);
  });
});

server.listen(PORT);
