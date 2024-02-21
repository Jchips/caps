'use strict';

const handler = (payload) => {
  console.log(`VENDOR: Thank you for your order ${payload.customer}`);
};

module.exports = handler;
