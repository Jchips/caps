'use strict';

const eventEmitter = require('../eventPool');
const transitHandler = require('./transit-handler');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(), emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('transit handler', () => {
  test('Handler returns expected', () => {
    let payload = { orderId: 'order-id' };
    transitHandler(payload);

    expect(console.log).toHaveBeenCalledWith('DRIVER: delivered order-id');
    expect(eventEmitter.emit).toHaveBeenCalledWith('delivered', payload);
  });
});
