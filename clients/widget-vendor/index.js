'use strict';

const Chance = require('chance');
const socket = require('../socket');
const vendorHandler = require('../flower-vendor/vendor-handler');

let chance = new Chance();
let store = 'acme-widgets';

socket.emit('join', store);

function Payload() {
  this.storeName = store;
  this.orderId = chance.guid();
  this.customer = chance.name();
  this.address = chance.address();
}

socket.on('delivered', (payload) => {
  setTimeout(() => {
    vendorHandler(payload, socket);
  }, 1000);
});

socket.emit('getAll', { clientId: 'acme-widgets', event: 'delivered' });

setInterval(() => {
  console.log('----------new package to acme-widgets--------');
  socket.emit('pickup', new Payload);
}, 2000);

setTimeout(() => {
  process.exit();
}, 60000);
