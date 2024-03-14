'use strict';

const handler = (payload, socket) => {
  console.log(`DRIVER: delivered ${payload.orderId}`);
  socket.emit('delivered', { ...payload, event: 'delivered' }); // everyone who has socket.on with that specific event in there
};

module.exports = handler;
