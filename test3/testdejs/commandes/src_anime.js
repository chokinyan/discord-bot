const {SlashCommandBuilder} = require("discord.js");
const request = require('request');
const {anime_id} = require("../donné & autre/config.json");

module.exports = {
    data : test = new SlashCommandBuilder()
            .setName("anime")
            .setDescription("recherche un anime")
            .addStringOption(option =>
                option.setName('anime')
                .setDescription("anime to search")
                .setRequired(true)
        ),

    async excute(interaction){
        const anime_name = interaction.options.getString('anime');
        interaction.reply("wait").then(mess =>{
            const parametre_P = {
                url : `https://api.myanimelist.net/v2/anime?q='${anime_name}'&nsfw=true&offset=0`,
                headers : {"X-MAL-CLIENT-ID" : anime_id}
            };
            request.get(parametre_P,(err,_repp,body) =>{
                if(err){
                    console.log(err);
                }
                else{
                    let animesrc_id = "";
                    mess.interaction?.editReply(`${body.charAt(body.indexOf("id")+3)}`);
                    
                }
            });
        })
    },
};