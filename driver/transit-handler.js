'use strict';

const eventEmitter = require('../eventPool');

const handler = (payload) => {
  console.log(`DRIVER: delivered ${payload.orderId}`);
  eventEmitter.emit('delivered', payload);
};

module.exports = handler;
