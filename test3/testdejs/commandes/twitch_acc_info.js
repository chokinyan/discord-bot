const {SlashCommandBuilder,EmbedBuilder} = require("discord.js");
const {gettoken} = require('../donné & autre/tokentw');
const {twitch_id} = require('../donné & autre/config.json');
const request = require('request');

module.exports = {
    data : command = new SlashCommandBuilder()
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
            },
            json : true
        };
        request.get(para,async (err,_repp,body)=>{
            if(err){
                console.error(err);
            }
            else{
                console.log(body);
                if(body.data.length === 0){
                    await interaction.reply({content : "channel not found !",ephemeral : true})
                }
                else{
                    const result = body.data[0];
                    const part = !(result.broadcaster_type === ""); 
                    const emb = new EmbedBuilder()
                    .setAuthor({name : `${result.display_name}`,url : `https://www.twitch.tv/${result.display_name}`})
                    .setColor('Purple')
                    .setImage(`${result.profile_image_url}`)
                    .setDescription(`${result?.description}`)
                    .setFooter({text : `twitch partenaire : ${part}`});
                    await interaction.reply({embeds : [emb]});
                }
            }
        });
    }
}