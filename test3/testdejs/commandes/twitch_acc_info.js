const {SlashCommandBuilder} = require("discord.js");
const {gettoken} = require('../donné & autre/tokentw');
const {twitch_id} = require('../donné & autre/config.json');
const request = require('request');

module.exports = {
    data : test = new SlashCommandBuilder()
    .setName("twitch_ifo")
    .setDescription("get info of a twitch channel")
    .addStringOption(option=>
        option.setName("twitch_src_name")
        .setDescription("channel to search")
        .setRequired(true)
        ),

    async excute(interaction){
        const token = await gettoken;
        const para = {
            url : `https://api.twitch.tv/helix/users?login=${interaction.options.getString('twitch_src_name')}`,
            headers : {
                Authorization : `Bearer ${token}`,
                "Client-Id" : twitch_id
            }
        };
        request.get(para,async (err,_repp,body)=>{
            if(err){
                console.error(err);
            }
            else{
                await interaction.reply({content : `${body}`});
            }
        });
    }
}