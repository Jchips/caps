'use strict';

const Chance = require('chance');
const socket = require('../socket');
const vendorHandler = require('./vendor-handler');

let chance = new Chance();
let store = '1-800-flowers';

socket.emit('join', store);

function Payload() {
  this.storeName = store;
  this.orderId = chance.guid();
  this.customer = chance.name();
  this.address = chance.address();
}

setInterval(() => {
  console.log('----------new package to 1-800-flowers--------');
  socket.emit('pickup', new Payload());
}, 1000);

socket.on('delivered', (payload) => {
  setTimeout(() => {
    vendorHandler(payload, socket);
  }, 1000);
});

socket.emit('getAll', { clientId: '1-800-flowers', event: 'delivered' });

setTimeout(() => {
  process.exit();
}, 60000);
