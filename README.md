# Discord Bot

This is a Discord bot built using the [discord.js](https://discord.js.org/#/) library. The bot includes various commands and functionalities to interact with users on a Discord server.

## Features

- Responds to specific commands.
- Executes code snippets provided by users.
- Manages interactions and events such as new member joins and message creations.

## Setup

### Prerequisites

- Node.js installed on your machine.
- A Discord bot token. You can get one by creating a bot on the [Discord Developer Portal](https://discord.com/developers/applications).

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/chokinyan/discord-bot.git
   cd discord-bot
   ```
2. Install the dependencies:

   ```sh
   npm install
   ```
3. Create a `config.json` file in the `fichier_utilitaire` directory with your bot token:

   ```json
   {
       "token" : "YOUR_DISCORD_BOT_TOKEN",
       "clientId" : "YOUR_CLIENT_ID",
       "identifiant" : "YOUR_IDENTIFIANT",
       "mdp" : "YOUR_PASSWORD",
       "navigatorpath": "C:/Program Files/Google/Chrome/Application/chrome.exe",
       "bot_owner_id" : "YOUR_BOT_OWNER_ID",
       "anime_id" : "YOUR_ANIME_ID",
       "sp_id" : "YOUR_SPOTIFY_ID",
       "sp_sid" : "YOUR_SPOTIFY_SID",
       "nasa_id" : "YOUR_NASA_ID",
       "tts_id" : "YOUR_TTS_ID",
       "twitch_id" : "YOUR_TWITCH_ID",
       "twitch_sid" : "YOUR_TWITCH_SID"
   }
   ```

## Usage

1. Start the bot:

   ```sh
   node bot/index.js
   ```
2. The bot will log "bot is ready" when it is successfully connected and ready to use.
