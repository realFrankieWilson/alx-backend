// 5-subscriber.js
import redis from 'redis';

const subscriber = redis.createClient();

subscriber.on('connect', () => {
	console.log('Redis client connected to the server');
});

subscriber.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});

// Subscribe to the channel
subscriber.subscribe('holberton school channel');

// Listen for message on the subscribed channel
subscriber.on('message', (channel, msg) => {
	console.log(`Recieved message: ${msg}`);
	if (msg === 'KILL_SERVER') {
		subscriber.unsubscribe();
		subscriber.quit();
	}
});
