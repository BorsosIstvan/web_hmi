const client = mqtt.connect("ws://poci.n-soft.net:9001"); // Pas IP aan indien nodig
const topic = "chat/messages";

const messagesDiv = document.getElementById("messages");
const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

client.on("connect", () => {
  console.log("✅ Verbonden met MQTT broker");
  client.subscribe(topic);
});

client.on("message", (receivedTopic, payload) => {
  if (receivedTopic === topic) {
    const data = JSON.parse(payload.toString());
    addMessage(data.name, data.message);
  }
});

sendButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  if (!name || !message) return;

  const payload = JSON.stringify({ name, message });
  client.publish(topic, payload);
  messageInput.value = "";
});

function addMessage(name, message) {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<span class="name">${name}:</span> ${message}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
