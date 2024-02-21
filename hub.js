'use strict';

const eventEmitter = require('./eventPool');
const Chance = require('chance');
const vendor = require('./vendor');
require('./driver');

let chance = new Chance();
let date = new Date();

vendor(chance.company());

function logger(event, payload) {
  console.log('EVENT:', { event, time: date, payload });
}

eventEmitter.on('pickup', (payload) => logger('pickup', payload));
eventEmitter.on('in-transit', (payload) => logger('in-transit', payload));
eventEmitter.on('delivered', (payload) => logger('delivered', payload));
