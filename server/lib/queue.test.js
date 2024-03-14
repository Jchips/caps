'use strict';

const Queue = require('./queue');

const notificationQueue = new Queue();

describe('queue', () => {
  test('queue can add a item', () => {
    let addedStore = notificationQueue.add('store1', new Queue);

    expect(notificationQueue.queue.store1).toEqual({ 'queue': {} });
    expect(addedStore).toEqual('store1');
  });

  test('queue can read items', () => {
    let store1Queue = notificationQueue.read('store1');

    expect(store1Queue).toEqual({ 'queue': {} });
  });

  test('queue values can add items', () => {
    let store1Queue = notificationQueue.read('store1');
    store1Queue.add('orderId1', { customer: 'cow' });

    expect(store1Queue.queue.orderId1).toEqual({ customer: 'cow' });
  });

  test('queue can add multiple items', () => {
    notificationQueue.add('store2', new Queue);
    notificationQueue.add('driver', new Queue);

    expect(Object.keys(notificationQueue.queue)).toEqual(['store1', 'store2', 'driver']);
  });

  test('queue can remove item', () => {
    let store1 = notificationQueue.read('store1');
    let value = store1.remove('orderId1');

    expect(value).toEqual({ customer: 'cow' });
    expect(Object.keys(notificationQueue.queue.store1.queue)).toEqual([]);
  });
});
