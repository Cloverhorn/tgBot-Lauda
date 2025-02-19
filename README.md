# Telegram Bot with Gemini AI

This project is a Telegram bot that uses the Gemini AI model to generate responses to user messages.

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd tgBot-Lauda
    ```

2.  **Install the dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:**

    Create a `.env` file in the root directory of the project and add the following keys:

    ```
    TELEGRAM_TOKEN=<your_telegram_bot_token>
    GEMINI_API_KEY=<your_gemini_api_key>
    ```

    *   Replace `<your_telegram_bot_token>` with the token you received from BotFather when you created your Telegram bot.
    *   Replace `<your_gemini_api_key>` with your Gemini API key.

4.  **Run the bot:**

    ```bash
    npm start
    ```

    The bot should now be running and ready to respond to messages in your Telegram chat.
