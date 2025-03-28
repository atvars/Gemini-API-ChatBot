import { GoogleGenerativeAI } from "@google/generative-ai";

// for this purpuse of project API key will be stored directly here
// const API_KEY = "AIzaSyD7bVkFIyWXalmhYV6kkEjwUYYsj5m9yKM";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro"
});

// history array
let messages = {
  history: [],
}

// sending message function
async function sendMessage() {
  const userMessage = document.querySelector(".chat-window input").value;

  // make sure message is not empty add direct html and delete input field
  if (userMessage.length){
    document.querySelector(".chat-window input").value = "";
    document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `
            <div class="user">
                <p>${userMessage}</p>
            </div>
        `);

        // send message
      const chat = model.startChat(messages);
      let result = await chat.sendMessage(userMessage)
      console.log(result.response.text());

  }
}

document.querySelector('.chat-window .input-area button')
.addEventListener('click', () => sendMessage());
