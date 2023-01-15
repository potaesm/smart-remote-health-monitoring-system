const mqtt = require('mqtt');
const cloudamqp = {
	url: 'mqtt://puffin.rmq2.cloudamqp.com',
	options: {
		username: 'gwbvwhzr:gwbvwhzr',
		password: 'BH4UyDm74GHbzdsYJOFtvZL7LTIM_bNB'
	}
};
const topic = 'app/data';
const client = mqtt.connect(cloudamqp.url, cloudamqp.options);
client.on('connect', function () {
	client.subscribe(topic, function (err) {
		if (!err) {
			client.publish(topic, JSON.stringify({ message: `Report client has subscribed the topic ${topic}` }));
			client.publish(topic, null, { qos: 2, retain: true });
		}
	});
});

function randomInt(min = 0, max = 1) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

setInterval(() => {
	const email = 'suthinan.musitmani@gmail.com';
	const p_name = 'Suthinan Musitmani';
	const report_length = 10;
	const data = { id: 'DEVICE_ID', temp: randomInt(36, 38), heart_rate: randomInt(70, 80), blood_oxygen: randomInt(95, 99), email, p_name, report_length };
	console.log('Publish:', data);
	client.publish(topic, JSON.stringify(data), { qos: 2, retain: true });
}, 1500);