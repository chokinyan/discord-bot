const {SlashCommandBuilder , EmbedBuilder} = require("discord.js");
const request = require('request');
const {anime_id} = require("../donné & autre/config.json");
const fs = require('node:fs');
const path = require('node:path');

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
                    let i = body.indexOf("id")+4;
                    while(true){
                        if(body[i] == ","){
                            break;
                        }
                        else{
                            animesrc_id += body[i]
                            i++;
                        };
                    };
                    const animeinfo = {
                        url : `https://api.myanimelist.net/v2/anime/${animesrc_id}?fields=title,rank,nsfw,rating`,
                        headers : {"X-MAL-CLIENT-ID" : anime_id}
                    };
                    request.get(animeinfo, async (error,_rep,bodytwo) =>{
                        if(error){
                            console.error(error);
                        }
                        else{
                            const resultat = JSON.parse(bodytwo);
                            console.log(resultat);
                            const emb = new EmbedBuilder()
                            .setAuthor({name : "my anime list api",iconURL : "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"})
                            .setImage(resultat.main_picture.medium)
                            .setColor(0x0000FF);
                            mess.interaction?.editReply({embeds : [emb],content : " "});
                        };
                    });
                    
                }
            });
        })
    },
};