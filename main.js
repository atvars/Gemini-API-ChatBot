import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyD7bVkFIyWXalmhYV6kkEjwUYYsj5m9yKM";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro",
    systemInstruction: businessInfo
});

let messages = {
  history: [],
}

async function sendMessage() {
  const userMessage = document.querySelector(".chat-window input").value;

  if (userMessage.length){
    document.querySelector(".chat-window input").value = "";
    document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `

            <div class="user">
                <p>${userMessage}</p>
            </div>
        `)

  }
}

document.querySelector('.chat-window .input-area button')
.addEventListener('click', () => sendMessage());
