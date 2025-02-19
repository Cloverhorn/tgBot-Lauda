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

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});

console.clear()


// Main


fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    console.log('Ваш IP-адрес:', data.ip);
  });


bot.onText(/.*/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  console.log(`${chatId}. ${msg.from.first_name}(${msg.from.username}): ${msg.text}`) //Что написал пользователь

  chat.sendMessage(match[0])
    .then(result => {
      bot.sendMessage(chatId, result.response.text())
      console.log(`${chatId}. Gemini: ${result.response.text()}`) //Что написал бот

    })
})

// bot.on('message', async (msg) => {
//   // console.log(msg.text)  
//   // console.log(msg)  

//   if (msg.document.mime_type === 'application/pdf') {
//     console.log('Это пдф ' + msg.document.file_name)

//     //Получаем ссылку на файл
//     const fileId = msg.document.file_id
//     const link = await bot.getFileLink(fileId)
//     console.log(link)

//     // Передаем ссылку в Gemini
//     const pdfResp = await fetch(link)
//       .then((response) => response.arrayBuffer());

//     const result = await model.generateContent([
//       {
//         inlineData: {
//           data: Buffer.from(pdfResp).toString("base64"),
//           mimeType: "application/pdf",
//         },
//       },
//       msg.caption,
//     ]);
//     // console.log(result.response.text());
//     bot.sendMessage(msg.chat.id, result.response.text())


//   }
// })