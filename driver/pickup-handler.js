'use strict';

const eventEmitter = require('../eventPool');

const handler = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  eventEmitter.emit('in-transit', payload);
};

module.exports = handler;
