const {SlashCommandBuilder} = require("discord.js");
const axios = require("axios");
const {nasa_id} = require('../fichier_utilitaire/config.json');


module.exports = {
    data : command = new SlashCommandBuilder()
    .setName("nasa")
    .setDescription("nasa api"),

    async excute(interaction){
        const parametre = {
            url : `https://api.nasa.gov/planetary/apod?api_key=${nasa_id}`
        };
        try {
            const response = await axios.get(parametre.url);
            const body = response.data;
            interaction.reply({content : `${body}`,tts : true});
        } catch (err) {
            console.log(err);
        }
    },

};