const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const {gettoken} = require('../fichier_utilitaire/tokentw');
const {twitch_id, twitch_sid} = require('../fichier_utilitaire/config.json');
const axios = require('axios');

module.exports = {
    data: command = new SlashCommandBuilder()
        .setName("twitch_chat")
        .setDescription("twitch chat"),

    async excute(interaction) {
        const token = await gettoken;
        axios.get(`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${twitch_id}&redirect_uri=http://localhost:3000&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671`)
            .then(async response => {
                console.log(response.data);
                await interaction.reply(`${response.data}`);
            })
            .catch(err => {
                console.error(err);
            });
    }
};

/*
https://id.twitch.tv/oauth2/authorize
    ?response_type=token
    &client_id=hof5gwx0su6owfnys0yan9c87zr6t
    &redirect_uri=http://localhost:3000
    &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
    &state=c3ab8aa609ea11e793ae92361f002671
*/