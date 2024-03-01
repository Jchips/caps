'use strict';

const handler = (payload, socket) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  socket.emit('in-transit', payload);
};

module.exports = handler;
