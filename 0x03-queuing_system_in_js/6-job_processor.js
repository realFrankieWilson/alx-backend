// 6-job_processor.js
// This file creates a queue, define a function to send notifications, and set
// up a job processor that listen for a new jobs in the `push_notification_code`queue.

import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Function to send notifications
function sendNotification(phoneNumber, message) {
	console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the queue.
queue.process('push_notification_code', (job, done) => {
	const { phoneNumber, message } = job.data;
	sendNotification(phoneNumber, message);
	done();	// Jobe done notice.
});
