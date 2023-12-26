const {SlashCommandBuilder , EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle} = require("discord.js");
const request = require('request');
const {anime_id} = require("../donné & autre/config.json");

const anime = (season,off)=>{
    return new Promise((resolve,reject)=>{

    })
}


module.exports = {
    data : command = new SlashCommandBuilder()
            .setName("seasonal\tanime")
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
    },
};