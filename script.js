const client = mqtt.connect('ws://poci.n-soft.net:9001'); // Pas aan naar jouw broker

client.on('connect', () => {
  console.log("MQTT verbonden");
  client.subscribe('hmi/led', (err) => {
    if (err) {
      console.error('Fout bij subscriben:', err);
    } else {
      console.log('Geabonneerd op topic hmi/led');
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Bericht ontvangen op topic ${topic}: ${message.toString()}`);
  if (topic === 'hmi/led') {
    const led = document.getElementById('led');
    const status = document.getElementById('ledStatus');
    if (message.toString() === 'on') {
      led.style.backgroundColor = 'green';
      status.textContent = 'ON';
      console.log('LED aan gezet');
    } else {
      led.style.backgroundColor = 'red';
      status.textContent = 'OFF';
      console.log('LED uit gezet');
    }
  }
});

document.getElementById('sendButton').addEventListener('click', () => {
  console.log('Stuur bericht "on" naar topic hmi/led');
  client.publish('hmi/led', 'on');
});

