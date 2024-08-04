// 8-job.test.js
import kue from 'kue';
import createPushNotificationsJobs from './8-job';
import { expect } from 'chai';

const queue = kue.createQueue();
const pushNot = createPushNotificationsJobs;

describe('CreatePushNotificationsJobs', () => {
	// Enter test mode
	before(() => {
		queue.testMode.enter();
	});

	// Clear the queue before each test
	beforeEach((done) => {
		queue.testMode.clear((err) => {
			if (err) return done(err); // Call done with the error if any
			done(); // Call done when clearing is complete
		});
	});

	// Exit test mode after all tests
	after(() => {
		queue.testMode.exit();
	});

	it('should display an error message if jobs is not an array', (done) => {
		try {
			pushNot({}, queue);
		} catch (error) {
			console.log(error.message);
			expect(error.message).to.equal('Jobs is not an array');
			done(); // Indicate test is complete
		}
	});

	it('should create two new jobs to the queue', (done) => {
		const jobs = [
			{ phoneNumber: '1234567890', message: 'Job 1' },
			{ phoneNumber: '1234567891', message: 'Job 2' },
		];

		pushNot(jobs, queue);

		// Validate the jobs in the queue
		const jobCount = queue.testMode.jobs.length;
		expect(jobCount).to.equal(2);

		// Check for the correct job data
		const job1 = queue.testMode.jobs[0];
		const job2 = queue.testMode.jobs[1];

		expect(job1.data).to.deep.equal(jobs[0]);
		expect(job2.data).to.deep.equal(jobs[1]);

		done(); // Indicate test is complete
	});
});

