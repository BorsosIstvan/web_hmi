const client = mqtt.connect("ws://poci.n-soft.net:9001"); // Pas IP aan
const topic = "chat/messages";

const messagesDiv = document.getElementById("messages");
const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

client.on("connect", () => {
  console.log("✅ Verbonden met MQTT broker");
  client.subscribe(topic);
  loadHistory(); // Laad berichten uit berichten.json
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

  localStorage.setItem("chatUser", name); // Opslaan als "ik"

  const payload = JSON.stringify({ name, message });

  // Verstuur naar MQTT
  client.publish(topic, payload);

  // Verstuur naar PHP voor opslag
  fetch("php/save_message.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload
  });
  
  messageInput.value = "";
});

function addMessage(name, message) {
  const currentUser = localStorage.getItem("chatUser");
  const div = document.createElement("div");
  div.className = "message-bubble";
  if (name === currentUser) {
    div.classList.add("mine");
  } else {
    div.classList.add("theirs");
  }
  div.innerHTML = `
    <div class="message-name">${name}</div>
    <div class="message-text">${message}</div>
  `;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function loadHistory() {
  fetch("php/load_message.php")
    .then(res => res.json())
    .then(data => {
      data.forEach(msg => {
        addMessage(msg.name, msg.message);
      });
    });
}
