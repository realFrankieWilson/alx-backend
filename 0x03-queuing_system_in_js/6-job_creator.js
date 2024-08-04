// 6-job_creator.js
// This file creates a queue using kue, define a job with required data, and handles job events.

import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Create a job object
const jobObj = {
	phoneNumber: '123-456-7890',
	message: 'Hello, this is a notification!'
};

// Create a job in the queue
const job = queue.create('push_notification_code', jobObj).save((err) => {
	if (!err) {
		console.log(`Notification job created: ${job.id}`);
	}
});

// On job completion
job.on('complete', () => {
	console.log('Notification job completed');
});

// On failure
job.on('failed', (err) => {
	console.log('Notification job failed:', err);
});
