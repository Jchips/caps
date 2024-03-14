'use strict';

class Queue {
  constructor() {
    this.queue = {};
  }

  /**
   * Adds a new queue to the notification queue.
   * @param {String} key - the store name (title of the queue) that I want to add
   * @param {Object} value - whatever I want to store in the store name queue
   * @returns {String} - the store name (title of the queue) that I just added (the key)
   */
  add(key, value) {
    this.queue[key] = value;
    console.log('new addition to queue');
    return key;
  }

  /**
   * Used to get a item stored in specified queue.
   * @param {String} key - the store name (title of the queue)
   * @returns {Object} - a object (that mimicks a queue) of all the notifications the store has missed
   */
  read(key) {
    return this.queue[key];
  }

  /**
   * Removes an item from the queue.
   * @param {String} key - the store name (title of the queue) that I want to remove
   * @returns {Object} - the queue or item in the queue that I'm deleting
   */
  remove(key) {
    let value = this.queue[key];
    delete this.queue[key];
    console.log('a notification was removed from the queue');
    return value;
  }
}

module.exports = Queue;
