'use strict';

const socket = require('../socket');
const pickUpHandler = require('./pickup-handler');
const transitHandler = require('./transit-handler');

socket.emit('join', '1-800-flowers');
socket.emit('join', 'acme-widgets');

socket.on('pickup', (payload) => {
  setTimeout(() => {
    pickUpHandler(payload, socket);
  }, 1000);
});

socket.on('in-transit', (payload) => {
  setTimeout(() => {
    transitHandler(payload, socket);
  }, 1000);
});

// socket.on('received', (payload) => {
//   console.log('delivered notification received', payload);
// });

socket.emit('getAll', { clientId: 'driver', event: 'pickup' });
