// 5-publisher.js
import redis from 'redis';

const pub = redis.createClient();

pub.on('connect', () => {
	console.log('Redis client connected to the server');
});

pub.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});

// Publishes messages after a specified time
function publishMessage(msg, time) {
	setTimeout(() => {
		console.log(`About to send ${msg}`);
		pub.publish('holberton school channel', msg);
	}, time);
}


// Calling the function with diff. message and delays.
publishMessage("Holberton Student #1 starts course", 100);

publishMessage("Holberton Student #2 starts course", 200);

publishMessage("KILL_SERVER", 300);

publishMessage("Holberton Student #3 starts course", 400);
