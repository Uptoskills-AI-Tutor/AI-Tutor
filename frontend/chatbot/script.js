const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-chat");

function addMessage(content, sender = "user") {
  const msgContainer = document.createElement("div");
  msgContainer.className = `message ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = `avatar`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = content;

  const time = document.createElement("div");
  time.className = "timestamp";
  time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  bubble.appendChild(time);

  if (sender === "bot") {
    msgContainer.appendChild(avatar);
    msgContainer.appendChild(bubble);
  } else {
    msgContainer.appendChild(bubble);
    msgContainer.appendChild(avatar);
  }

  chatBox.appendChild(msgContainer);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  // Simulate typing...
  const typing = document.createElement("div");
  typing.className = "message bot";
  typing.innerHTML = `<div class="avatar"></div><div class="bubble">Typing...</div>`;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    typing.remove();
    addMessage("Here’s a helpful explanation! 📘", "bot");
  }, 1000);
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", e => e.key === "Enter" && sendMessage());
clearBtn.addEventListener("click", () => chatBox.innerHTML = "");
