// 7-job_processor.js
// This file creates a queue, handle job processing, and manage blacklisted phone numbers.

import kue from 'kue';

// An array of blacklisted phone numbers.
const blacklistedNumbers = [
	'4153518780',
	'4153518781'
];

// Sends notification.
function sendNotification(phoneNumber, message, job, done) {
	// Tracks progress to 0%
	job.progress(0, 100);

	// Check for blacklisted numbers.
	if (blacklistedNumbers.includes(phoneNumber)) {
		// Fail the job with an error
		return done(new Error(`phone number ${phoneNumber} is blacklisted`));
	}

	// Track progress to 50%
	job.progress(50, 100);

	// Log the notification sending message.
	console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

	// Simulation of sending notification (e.g, API call)
	setTimeout(() => {
		// Track progress to 100%
		job.progress(100, 100);
		done(); // Job completed.
	}, 1000); // Delay of 1 sec
}

// A queue
const queue = kue.createQueue({
	concurrency: 2	// Process 2 jobs at a time.
});

// Process jobs in the queue.
queue.process('push_notification_code_2', (job, done) => {
	const { phoneNumber, message } = job.data;
	sendNotification(phoneNumber, message, job, done);
});

// Log job completeion and failure
queue.on('job completed', (id) => {
	console.log(`Notification job #${id} completed`);
});

queue.on('job failed', (id, err) => {
	console.log(`Notification job #${id} failed: ${err.message}`);
});
