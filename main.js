import { GoogleGenerativeAI } from "@google/generative-ai";

// for this purpuse of project API key will be stored directly here
const API_KEY = "_AIzaSyD7bVkFIyWXalmhYV6kkEjwUYYsj5m9yKM";
const genAI = new GoogleGenerativeAI(API_KEY);
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

    try {
      document.querySelector(".chat-window input").value = "";
      document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `
              <div class="user">
                  <p>${userMessage}</p>
              </div>
          `);
  
          // send message
        const chat = model.startChat(messages);
        let result = await chat.sendMessage(userMessage)
  
        document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `
          <div class="model">
              <p>${result.response.text()}</p>
          </div>
      `);
  
      // adding to history user input
          messages.history.push({
            role: "user",
            parts:[{text: userMessage}],
          });
          
      // // adding to history bot response
          messages.history.push({
            role: "model",
            parts:[{text: result.response.text()}],
          });
      
    } catch (error) {
      document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `
        <div class="error">
            <p style=color:red;>Sorry, the message could not be sent!</p>
        </div>
    `);
    }

        

  }
}

document.querySelector('.chat-window .input-area button')
.addEventListener('click', () => sendMessage());
