// 8-job.js
// This file contain a function that handles job creation in Kue queue.

import kue from 'kue';

// A push notification for jobs.
function createPushNotificationsJobs(jobs, queue) {
	// check if job is an array
	if (!Array.isArray(jobs)) {
		throw new Error('Jobs is not an array');
	}

	// Loop through the jobs array and crate a job for each object.
	jobs.forEach((jobData) => {
		const job = queue.create('push_notification_code_3', jobData)
		.save((err) => {
			if (!err) {
				console.log(`Notification job created: ${job.id}`);
			}
		});

		// Handle the job failure on creation
		job.on('failed', (err) => {
			console.log(`Notification job ${job.id} failed: ${err}`);
		});

		// Handles the job progress.
		job.on('progress', (percentage) => {
			console.log(`Notification job ${job.id} ${percentage}% complete`);
		});

		// Handles the job completion.
		job.on('complete', () => {
			console.log(`Notification job ${job.id} completed`);
		});
	});
}
export default createPushNotificationsJobs;
