'use strict';

const Chance = require('chance');
const socket = require('../socket');
const vendorHandler = require('./vendor-handler');

let chance = new Chance();

socket.emit('join', '1-206-flowers');

function Payload() {
  this.storeName = '1-206-flowers';
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
  socket.emit('pickup', new Payload());
}, 5000);

socket.on('delivered', (payload) => {
  setTimeout(() => {
    vendorHandler(payload);
  }, 1000);
});

setTimeout(() => {
  process.exit();
}, 20000);
