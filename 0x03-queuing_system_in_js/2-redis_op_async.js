// 1-redis_op.js
import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

client.on('connect', () => {
	console.log('Redis client connected to the server');
});

client.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});

// Promisify get method
const getAsync = promisify(client.get).bind(client);


// Set a new school value in Redis
function setNewSchool(schoolName, value) {
	client.set(schoolName, value, redis.print);
}

// Async function to display the of school from Redis
async function displaySchoolValue(schoolName) {
	try {
		const resp = await getAsync(schoolName);
		console.log(`Value for ${schoolName}: ${resp}`);
	} catch (err) {
		console.log(`Error retrieving value: ${err}`);
	}
}

// Display the value of school from Redis
// function displaySchoolValue(schoolName) {
//	client.get(schoolName, (err, resp) => {
//		if (err) {
//			console.log(`Error retrieving value: ${err}`);
//		} else {
//			console.log(resp);
//		}
//	});
// }

// Example usage
(async () => {
	await displaySchoolValue('Holberton');
	setNewSchool('HolbertonSanFrancisco', '100');
	await displaySchoolValue('HolbertonSanFrancisco');
})();
