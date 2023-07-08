const {SlashCommandBuilder} = require("discord.js");
const {sp_id,sp_sid} = require('../donné & autre/config.json');
const request = require('request');

const get_api_key = new Promise((resolve,reject)=>{
    const para = {
        url : 'https://accounts.spotify.com/api/token',
        headers : {
            'Content-type' : 'application/x-www-form-urlencoded',
           'Authorization': 'Basic ' + btoa(sp_id + ':' + sp_sid).toString('base64')
        },
        body : 'grant_type=client_credentials',
        json : true
    };

    request.post(para,(err,_rep,body)=>{
        if(err){
            console.error(err);
        }
        else{
            resolve(body.access_token);
        };
    });
});

module.exports = {
    data : test = new SlashCommandBuilder()
    .setName("spotifyc")
    .setDescription("link your spotify account to the bot"),

    async excute(interaction){
        const api_key = await get_api_key;
        interaction.reply({content : `https://accounts.spotify.com/authorize?client_id=${sp_id}&redirect_uri=https://chokinyan.w3spaces.com/index.html&scope=user-read-playback-state%20&response_type=token&show_dialog=true`})
    },
};