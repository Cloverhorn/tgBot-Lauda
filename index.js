// Telegram bot
require('dotenv').config()
const telegramBot = require('node-telegram-bot-api')
const telegram_token = process.env.TELEGRAM_TOKEN
const bot = new telegramBot(telegram_token, { polling: true })

// Gemini
const gemini_token = process.env.GEMINI_API_KEY
const { GoogleGenerativeAI } = require("@google/generative-ai")
const genAI = new GoogleGenerativeAI(gemini_token)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })


console.clear()

// IP Check
fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
  console.log('Ваш IP-адрес:', data.ip);
});

// Main
chatList = []

function chatListAdd(id) {
  chatList.push(
    {
      id: id,
      chat: model.startChat(),
      send: function (message) {
        return this.chat.sendMessage(message)
      },
    })
}

bot.onText(/.*./, (msg, match) => {
  
  chatId = msg.chat.id
  
  let chat = chatList.find(c => c.id === chatId);
  
  if (!chat) {
    chatListAdd(chatId);
    chat = chatList.find(c => c.id === chatId);
  }
  
  console.log(`${chatId}. ${msg.from.first_name}(${msg.from.username}): ${msg.text}`) //Что написал пользователь
  // console.log(chat)
  
  chat.send(match[0])
    .then(result => {
      console.log(`${chatId}. Gemini: ${result.response.text()}`) //Что написал бот ;      
      bot.sendMessage(chat.id, result.response.text())
    })
})



// bot.onText(/.*/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;

//   console.log(`${chatId}. ${msg.from.first_name}(${msg.from.username}): ${msg.text}`) //Что написал пользователь

//   chat.sendMessage(match[0])
//     .then(result => {
//       bot.sendMessage(chatId, result.response.text())
//       console.log(`${chatId}. Gemini: ${result.response.text()}`) //Что написал бот

//     })
// })
