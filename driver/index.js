'use strict';

const eventEmitter = require('../eventPool');
const pickUpHandler = require('./pickup-handler');
const transitHandler = require('./transit-handler');

eventEmitter.on('pickup', (payload) => {
  setTimeout(() => {
    pickUpHandler(payload);
  }, 1000);
});

eventEmitter.on('in-transit', (payload) => {
  setTimeout(() => {
    transitHandler(payload);
  }, 1000);
});
