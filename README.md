# LAB - Class 11, 12, 13

## Project: CAPS

### Author: Jelani R

### Problem Domain

CAPS simulates a delivery service where vendors (such a flower shops) will ship products using our delivery service and when our drivers deliver them, each vendor will be notified that their customers received what they purchased.

The goal is to setup a pool of events and handler functions, with the intent being to refactor parts of the system throughout the week, but keep the handlers themselves largely the same. The task of “delivering a package” doesn’t change (the handler), even if the mechanism for triggering that task (the event) does.

The following user/developer stories detail the major functionality for this phase of the project.

As a vendor, I want to alert the system when I have a package to be picked up.
As a driver, I want to be notified when there is a package to be delivered.
As a driver, I want to alert the system when I have picked up a package and it is in transit.
As a driver, I want to alert the system when a package has been delivered.
As a vendor, I want to be notified when my package has been delivered.
And as developers, here are some of the development stories that are relevant to the above.

As a developer, I want to use industry standards for managing the state of each package.
As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time.

Lab 12: As a developer, I want to create network event driven system using Socket.io so that I can write code that responds to events originating from both servers and client applications.

Lab 13: Simulate a delivery driver receiving a list of orders from a Queue and “scanning” package codes on delivery. Retailers will be able to see in their dashboard or log, a list of all packages delivered in real time. Should a delivery driver deliver any packages while the retailer is not connected to the dashboard, the vendor client should be guaranteed to receive “delivery” notifications from the Queue system.

As a vendor, I want to “subscribe” to “delivered” notifications so that I know when my packages are delivered.
As a vendor, I want to “catch up” on any “delivered” notifications that I might have missed so that I can see a complete log.
As a driver, I want to “subscribe” to “pickup” notifications so that I know what packages to deliver.
As a driver, I want to “catch up” on any “pickup” notifications I may have missed so that I can deliver everything.
As a driver, I want a way to “scan” a delivery so that the vendors know when a package has been delivered.
As a developer, I want to create a system of tracking who is subscribing to each event.
As a developer, I want to place all inbound messages into a “queue” so that my application knows what events are to be delivered.
As a developer, I want to create a system for communicating when events have been delivered and received by subscribers.
As a developer, I want to delete messages from the queue after they’ve been received by a subscriber, so that I don’t re-send them.
As a developer, I want to create a system for allowing subscribers to retrieve all undelivered messages in their queue.

### Links and Resources

- [GitHub Actions ci/cd](https://github.com/Jchips/caps/actions)
- [Pull Request](https://github.com/Jchips/caps/pull/3)

### Setup

#### `.env` requirements

- PORT=your-port-number

#### How to initialize/run your application

- `nodemon` (if installed) OR
- `npm start`

#### Features / Routes

- What was your key takeaway?

  My key takeaway is an understanding of the basics of event driven programming and message queues with Socket.io.

- Events

  - pickup - picked up package
  - in-transit - package is in-transit
  - delivered - package is delivered
  - received - package was been received by vendor
  - getAll - Get all missed notifications

- Pull requests:

    <https://github.com/Jchips/caps/pull/1>
    <https://github.com/Jchips/caps/pull/2>
    <https://github.com/Jchips/caps/pull/3>

#### Tests

- How do you run tests?
`npm test`
- Any tests of note?
  - Makes sure the handlers are all doing what's expected.
  - Queue can add, read, and remove items

#### UML

![Lab 11 UML](./assets/lab-11-uml.png)
