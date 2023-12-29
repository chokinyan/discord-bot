const {SlashCommandBuilder} = require("discord.js");
const request = require("request");
const {nasa_id} = require('../donné & autre/config.json');


module.exports = {
    data : command = new SlashCommandBuilder()
    .setName("nasa")
    .setDescription("nasa api"),

    async excute(interaction){
        const parametre = {
            url : `https://api.nasa.gov/planetary/apod?api_key=${nasa_id}`
        };
        request.get(parametre,(err,rep,body)=>{
            if(err){
                console.log(err);
            }
            else{
                interaction.reply({content : `${body}`,tts : true});
            };
        });
    },

};