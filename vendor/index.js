'use strict';

const eventEmitter = require('../eventPool');
const vendorHandler = require('./vendor-handler');
const Chance = require('chance');

let chance = new Chance();

const vendor = (storeName) => {

  const payload = {
    store: storeName,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  setInterval(() => {
    console.log('----------new package--------');
    eventEmitter.emit('pickup', payload);
  }, 5000);

  eventEmitter.on('delivered', (payload) => {
    setTimeout(() => {
      vendorHandler(payload);
    }, 1000);
  });
};

module.exports = vendor;
