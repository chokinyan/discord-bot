const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const {gettoken} = require('../fichier_utilitaire/tokentw');
const {twitch_id} = require('../fichier_utilitaire/config.json');
const axios = require('axios');

module.exports = {
    data: command = new SlashCommandBuilder()
        .setName("twitch_ifo")
        .setDescription("get info of a twitch channel")
        .addStringOption(option =>
            option.setName("twitch_src_name")
                .setDescription("channel to search")
                .setRequired(true)
        ),

    async excute(interaction) {
        const token = await gettoken;
        const para = {
            url: `https://api.twitch.tv/helix/users?login=${interaction.options.getString('twitch_src_name')}`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Client-Id": twitch_id
            }
        };
        axios.get(para.url, { headers: para.headers })
            .then(async response => {
                const body = response.data;
                console.log(body);
                if (body.data.length === 0) {
                    await interaction.reply({ content: "channel not found !", ephemeral: true });
                } else {
                    const result = body.data[0];
                    const part = !(result.broadcaster_type === "");
                    const emb = new EmbedBuilder()
                        .setAuthor({ name: `${result.display_name}`, url: `https://www.twitch.tv/${result.display_name}` })
                        .setColor('Purple')
                        .setImage(`${result.profile_image_url}`)
                        .setDescription(`${result?.description}`)
                        .setFooter({ text: `twitch partenaire : ${part}` });
                    await interaction.reply({ embeds: [emb] });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
};