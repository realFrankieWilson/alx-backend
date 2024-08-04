// 4-redis_advanced_op.js
import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
	console.log('Redis client connected to the server');
});

client.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});

// A function that create a hash with school data
function createSchoolHash() {
	const schoolData = {
		Portland: 50,
		Seattle: 80,
		'New York': 20,
		Bogota: 20,
		Cali: 40,
		Paris: 2,
	};

	// Set key-value pair using hset and print reply.
	for (const [key, value] of Object.entries(schoolData)) {
		client.hset('HolbertonSchools', key, value, (err, reply) => {
			if (err) {
				console.log(`Error setting ${key}: ${err}`);
			} else {
				console.log(`Reply: ${reply}`);
			}
		});
	}
}

// Display the hashed data
function displaySchoolHash() {
	client.hgetall('HolbertonSchools', (err, reply) => {
		if (err) {
			console.log(`Error retrieving hash: ${err}`);
		} else {
			console.log(reply);
		}
	});
}

// Create the hash display it.
createSchoolHash();
setTimeout(displaySchoolHash, 1000);	// Delay to ensure hash is created before retrieval

setTimeout(() => {
	client.quit();
}, 5000);
