'use strict';

const socket = require('../socket');
const vendorHandler = require('./vendor-handler');

jest.mock('../socket.js', () => {
  return {
    on: jest.fn(), emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('vendor handler', () => {
  test('Handler returns expected', () => {
    let payload = { order: { customer: 'dog' } };
    vendorHandler(payload, socket);

    expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for your order dog');
    expect(socket.emit).toHaveBeenCalledWith('received', payload);
  });
});
