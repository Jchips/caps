'use strict';

const vendorHandler = require('./vendor-handler');

console.log = jest.fn();

describe('vendor handler', () => {
  test('Handler returns expected', () => {
    let payload = { customer: 'dog' };
    vendorHandler(payload);

    expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for your order dog');
  });
});
