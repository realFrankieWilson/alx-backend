// 100-seat.js
// This file will creates an Express server that allows for seat
// reservations and manages available seats using Redis.

const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const kue = require('kue');
const queue = kue.createQueue();

const app = express();
const port = 1245;

// Creates the Redis client
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize available seats
const INITIAL_SEATS = 50;
let reservationEnabled = true;

// Function: to reserve seats
const reserveSeat = async (num) => {
  await setAsync('available_seats', num);
};

// Function to get current available seats
const getCurrentAvailableSeats = async () => {
  const seats = await getAsync('available_seats');
  return seats ? parseInt(seats, 10) : 0;
};

// Set initial available seats
reserveSeat(INITIAL_SEATS);

// Rout: to get available seats
app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats.toString() });
});

// Rout: to reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservations are blocked' });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });
});

// Process the queue
queue.process('reserve_seat', async (job, done) => {
  try {
    const currentSeat = await getCurrentAvailableSeats();
    if (currentSeat <= 0) {
      reservationEnabled = false; // No seats availabe to be booked.
      throw new Error('Not enough seats available');
    }

    await reserveSeat(currentSeat - 1);
    console.log(`Seat reservation job ${job.id} completed`);
    done();
  } catch (error) {
    console.log(`Seat reservation job ${job.id} failed: ${error.message}`);
    done(new Error(error.message));
  }
});

// Route: to process the queue
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue procession' });
  queue.process('reserve_seat');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
