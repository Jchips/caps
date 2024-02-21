'use strict';

const eventEmitter = require('../eventPool');
const pickUpHandler = require('./pickup-handler');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(), emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('pickup handler', () => {
  test('Handler returns expected', () => {
    let payload = { orderId: 'order-id' };
    pickUpHandler(payload);

    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up order-id');
    expect(eventEmitter.emit).toHaveBeenCalledWith('in-transit', payload);
  });
});
