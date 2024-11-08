const {SlashCommandBuilder} = require("discord.js");
const {sp_id, sp_sid} = require('../fichier_utilitaire/config.json');
const axios = require('axios');

const get_api_key = new Promise((resolve, reject) => {
    const para = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(sp_id + ':' + sp_sid).toString('base64')
        },
        data: new URLSearchParams({
            grant_type: 'client_credentials'
        })
    };

    axios.post(para.url, para.data, { headers: para.headers })
        .then(response => {
            resolve(response.data.access_token);
        })
        .catch(err => {
            console.error(err);
            reject(err);
        });
});

module.exports = {
    data: command = new SlashCommandBuilder()
        .setName("spotifyc")
        .setDescription("link your spotify account to the bot"),

    async excute(interaction) {
        const api_key = await get_api_key;
        axios.get(`https://accounts.spotify.com/authorize?client_id=${sp_id}&redirect_uri=https://chokinyan.w3spaces.com/index.html&scope=user-read-playback-state%20&response_type=token&show_dialog=true`)
            .then(async response => {
                console.log(response.data);
                //await interaction.reply({content: `${response.data}`});
            })
            .catch(err => {
                console.error(err);
            });
        //interaction.reply({content : `https://accounts.spotify.com/authorize?client_id=${sp_id}&redirect_uri=https://chokinyan.w3spaces.com/index.html&scope=user-read-playback-state%20&response_type=token&show_dialog=true`})
    },
};