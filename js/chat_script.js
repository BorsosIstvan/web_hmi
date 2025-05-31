//let currentUser = null;
//let chatPartner = null;

const client = mqtt.connect("ws://poci.n-soft.net:9001");
const topic = "chat/messages";

const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

fetch("../messages/users.json")
  .then(res => res.json())
  .then(users => {
    if (users.length < 2) return alert("Minimaal 2 gebruikers nodig.");
    currentUser = users[0];  // Jij
    chatPartner = users[1];  // Eerste gesprekspartner

    document.getElementById("chat-header").innerText = `💬 ${chatPartner.username}`;
    loadHistory();
  });

client.on("connect", () => {
  console.log("✅ Verbonden met MQTT broker");
  client.subscribe(topic);
});

client.on("message", (receivedTopic, payload) => {
  if (receivedTopic === topic) {
    const data = JSON.parse(payload.toString());
    const isMine = data.name === currentUser.username;
    const isToMe = data.to === currentUser.username;

    if (isMine || isToMe) {
      addMessage(data.name, data.message);
    }
  }
});

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (!message) return;

  const payload = JSON.stringify({
    name: currentUser.username,
    to: chatPartner.username,
    message
  });

  client.publish(topic, payload);

  fetch("php/save_message.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload
  });

  messageInput.value = "";
});

function addMessage(name, message) {
  const div = document.createElement("div");
  div.className = "message-bubble";

  if (name === currentUser.username) {
    div.classList.add("mine");
    div.innerHTML = `
      <div class="message-text">${message}</div>
      <div class="status">✅✅</div>
    `;
  } else {
    div.classList.add("theirs");
    div.innerHTML = `
      <div class="message-text">${message}</div>
    `;
  }

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function loadHistory() {
  fetch("php/load_message.php")
    .then(res => res.json())
    .then(data => {
      data.forEach(msg => {
        const involved = (msg.name === currentUser.username && msg.to === chatPartner.username) ||
                         (msg.name === chatPartner.username && msg.to === currentUser.username);
        if (involved) {
          addMessage(msg.name, msg.message);
        }
      });
    });
}
