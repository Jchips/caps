'use strict';

const socket = require('../socket');
const transitHandler = require('./transit-handler');

jest.mock('../socket.js', () => {
  return {
    on: jest.fn(), emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('transit handler', () => {
  test('Handler returns expected', () => {
    let payload = { orderId: 'order-id' };
    transitHandler(payload, socket);

    expect(console.log).toHaveBeenCalledWith('DRIVER: delivered order-id');
    expect(socket.emit).toHaveBeenCalledWith('delivered', { ...payload, event: 'delivered' });
  });
});
