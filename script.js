const client = mqtt.connect('poci.n-soft.net:1883'); // Pas eventueel IP/hostname aan

client.on('connect', () => {
  console.log("MQTT verbonden");
  client.subscribe('hmi/led'); // Luister op dit topic
});

client.on('message', (topic, message) => {
  if (topic === 'hmi/led') {
    const led = document.getElementById('led');
    const status = document.getElementById('ledStatus');
    if (message.toString() === 'on') {
      led.style.backgroundColor = 'green';
      status.textContent = 'ON';
    } else {
      led.style.backgroundColor = 'red';
      status.textContent = 'OFF';
    }
  }
});

document.getElementById('sendButton').addEventListener('click', () => {
  client.publish('hmi/button', 'pressed');
});
