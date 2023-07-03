const {SlashCommandBuilder , EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle} = require("discord.js");
const request = require('request');
const {anime_id} = require("../donné & autre/config.json");
const {sleep} = require("../donné & autre/wait");
const fs = require('fs');
const nsfwanim = ["r","r+","rx"];
let off = 0;

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
        const nsfw = interaction.channel.nsfw;
        const parametre_P = {
            url : `https://api.myanimelist.net/v2/anime?q='${anime_name}'&nsfw=true&offset=${off}`,
            headers : {"X-MAL-CLIENT-ID" : anime_id}
        };
        request.get(parametre_P,(err,_repp,body) =>{
            if(err){
                console.log(err);
            }
            else{
                const res = JSON.parse(body);
                const animesrc_id = res?.data[0].node.id;
                console.log(res);
                const animeinfo = {
                    url : `https://api.myanimelist.net/v2/anime/${animesrc_id}?fields=title,synopsis,rank,nsfw,rating`,
                    headers : {"X-MAL-CLIENT-ID" : anime_id}
                };
                request.get(animeinfo, async (error,_rep,bodytwo) =>{
                    if(error){
                        console.error(error);
                    }
                    else{
                        const resultat = JSON.parse(bodytwo);
                        if(!nsfw & nsfwanim.includes(resultat.rating)){
                            await interaction.reply({content : "nsfw anime please use a nsfw channel"});
                            await sleep(5);
                            await interaction.deleteReply();
                        }
                        else{
                            const nextanime = new ActionRowBuilder()
                            .setComponents(
                                new ButtonBuilder()
                                .setCustomId("nextanime")
                                .setLabel("Next anime found")
                                .setStyle(ButtonStyle.Success)
                            );
                            const emb = new EmbedBuilder()
                            .setAuthor({name : resultat.title})
                            .setDescription(resultat.synopsis)
                            .setColor(0x0000FF)
                            .setImage(resultat?.main_picture?.medium)
                            .setFooter({text : "By the god the only one chokinyan", iconURL : "https://static1.personality-database.com/profile_images/cafc44b66144402fadf751bf4ff2486c.png"});
                            await interaction.reply({embeds : [emb],components : [nextanime],tts : true});
                        };
                    };
                });
                
            }
        });
    },

    async excomp(interaction){
        switch (interaction.CustomId){
            case "nextanime":
                
                break;
        }
    },
};