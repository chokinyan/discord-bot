const {SlashCommandBuilder,EmbedBuilder} = require("discord.js");
const {gettoken} = require('../donné & autre/tokentw');
const {twitch_id,twitch_sid} = require('../donné & autre/config.json');
const request = require('request');

module.exports = {
    data : test = new SlashCommandBuilder()
    .setName("twitch_chat")
    .setDescription("twitch chat"),

    async excute(interaction){
        const token = await gettoken;
        request.get({url : `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${twitch_id}&redirect_uri=http://localhost:3000&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671`},async (err,rep,body)=>{
            if(err){
                console.error(err);
            }
            else{
                console.log(body)
                await interaction.reply(`${rep}`)
            }
        })
    }
}

/*
https://id.twitch.tv/oauth2/authorize
    ?response_type=token
    &client_id=hof5gwx0su6owfnys0yan9c87zr6t
    &redirect_uri=http://localhost:3000
    &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
    &state=c3ab8aa609ea11e793ae92361f002671
*/