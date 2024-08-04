// 1-redis_op.js
import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
	console.log('Redis client connected to the server');
});

client.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});

// Set a new school value in Redis
function setNewSchool(schoolName, value) {
	client.set(schoolName, value, redis.print);
}

// Display the value of school from Redis
function displaySchoolValue(schoolName) {
	client.get(schoolName, (err, resp) => {
		if (err) {
			console.log(`Error retrieving value: ${err}`);
		} else {
			console.log(resp);
		}
	});
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
