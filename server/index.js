'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const Queue = require('./lib/queue');
const notificationQueue = new Queue();

const PORT = process.env.PORT || 3002;
const server = new Server();
let date = new Date();

/**
 * Logs every event to the console.
 * @param {String} event - the event that is being logged
 * @param {Object} payload - the payload (order data)
 */
function logger(event, payload) {
  console.log('EVENT:', { event, time: date, payload });
}

const caps = server.of('/caps');
caps.on('connection', (socket) => {
  console.log('socket connected to caps namespace', socket.id);
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`joined the ${room} room`);
  });

  socket.onAny((event, payload) => logger(event, payload));

  // adds everything that's ready for pickup to driver queue
  socket.on('pickup', (payload) => {
    let newPayload = {
      event: 'pickup', // either pickup or delivered
      orderId: payload.orderId,
      clientId: payload.storeName,  // either acme-widgets or 1-800-flowers
      order: payload,
    };

    let driverQueue = notificationQueue.read('driver');
    if (!driverQueue) {
      let driverKey = notificationQueue.add('driver', new Queue);
      driverQueue = notificationQueue.read(driverKey);
    }

    driverQueue.add(newPayload.orderId, newPayload);
    socket.to(newPayload.clientId).emit('pickup', newPayload);
  });

  // remove from queue when payload is received
  socket.on('received', (payload) => {
    let vendorQueue = notificationQueue.read(payload.clientId);
    if (!vendorQueue) {
      throw new Error('can\'t delete notifications without a queue');
    }
    vendorQueue.remove(payload.orderId);
  });

  socket.on('in-transit', (payload) => {
    caps.to(payload.clientId).emit('in-transit', payload);
  });

  // adds everything that's ready for delivery to specific vender queue
  socket.on('delivered', (payload) => {
    let vendorQueue = notificationQueue.read(payload.clientId);
    if (!vendorQueue) {
      let newQueueKey = notificationQueue.add(payload.clientId, new Queue);
      vendorQueue = notificationQueue.read(newQueueKey);
    }
    vendorQueue.add(payload.orderId, payload);
    socket.to(payload.clientId).emit('delivered', payload);
  });

  // gets everything in queue
  socket.on('getAll', (payload) => {
    let clientQueue = notificationQueue.read(payload.clientId);
    if (clientQueue && clientQueue.queue) {
      Object.keys(clientQueue.queue).forEach(orderId => {
        socket.emit(payload.event.toString(), clientQueue.read(orderId));
      });
    }
  });
});

server.listen(PORT);
