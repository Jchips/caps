'use strict';

const eventEmitter = require('../eventPool');
const vendorHandler = require('./vendor-handler');
const Chance = require('chance');

let chance = new Chance();

const vendor = (storeName) => {

  function Payload(storeName) {
    this.storeName = storeName;
    this.orderId = chance.guid();
    this.customer = chance.name();
    this.address = chance.address();
  }

  // const payload = {
  //   store: storeName,
  //   orderId: chance.guid(),
  //   customer: chance.name(),
  //   address: chance.address(),
  // };

  setInterval(() => {
    console.log('----------new package--------');
    eventEmitter.emit('pickup', new Payload(storeName));
  }, 5000);

  eventEmitter.on('delivered', (payload) => {
    setTimeout(() => {
      vendorHandler(payload);
    }, 1000);
  });
};

module.exports = vendor;
