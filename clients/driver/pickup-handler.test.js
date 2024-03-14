'use strict';

const socket = require('../socket');
const pickUpHandler = require('./pickup-handler');

jest.mock('../socket.js', () => {
  return {
    on: jest.fn(), emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('pickup handler', () => {
  test('Handler returns expected', () => {
    let payload = { order: { orderId: 'order-id' } };
    pickUpHandler(payload, socket);

    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up order-id');
    expect(socket.emit).toHaveBeenCalledWith('in-transit', payload);
  });
});
