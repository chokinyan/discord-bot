const {SlashCommandBuilder , EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle} = require("discord.js");
const request = require('request');
const {anime_id} = require("../donné & autre/config.json");
const {anime_info} = require('../donné & autre/anime_info');
const nsfwanim = ["r","r+","rx"];


const anime = (season,year,off)=>{
    return new Promise((resolve,reject)=>{
        const parametre = {
            url : `https://api.myanimelist.net/v2/anime/season/${year}/${season}?limit=1&offset=${off}`,
            headers : {"X-MAL-CLIENT-ID" : anime_id},
            json : true
        };
        request.get(parametre,(err,_rep,body)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(body)
            }
        });
    })
}


module.exports = {
    data : command = new SlashCommandBuilder()
            .setName("seasonal_anime")
            .setDescription("search any anime from a season")
            .addStringOption(option =>
                option.setName('season')
                .setDescription("choose a season")
                .setRequired(true)
                .setChoices(
                    {
                        name : "winter",
                        value : "winter"
                    },
                    {
                        name : "spring",
                        value : "spring"
                    },
                    {
                        name : "summer",
                        value : "summer"
                    },
                    {
                        name : "fall",
                        value : "fall"
                    },
                )
        )
        .addIntegerOption(option=>
            option
            .setName('year')
            .setDescription('choice a year')
        ),

    async excute(interaction){
        const year = interaction.options.getInteger('year');
        const season = interaction.options.getString('season');
        const resultat = await anime(season,year,0);
        await interaction.reply({content : `${resultat.data[0].node.id}`});
        console.log(await anime_info(resultat.data[0].node.id));
    },
};