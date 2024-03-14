'use strict';

const handler = (payload, socket) => {
  console.log(`VENDOR: Thank you for your order ${payload.order.customer}`);
  socket.emit('received', payload);
};

module.exports = handler;
