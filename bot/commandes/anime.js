const {SlashCommandBuilder , EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle} = require("discord.js");
const axios = require('axios');
const {anime_id} = require("../fichier_utilitaire/config.json");
const {anime_info} = require('../fichier_utilitaire/anime_info');
const nsfwanim = ["r","r+","rx"];

const get_anime  = async (nom, off) => {
    try {
        const parametre = {
            url : `https://api.myanimelist.net/v2/anime?q='${nom}'&nsfw=true&offset=${off}`,
            headers : {"X-MAL-CLIENT-ID" : anime_id},
        };
        const response = await axios.get(parametre.url, { headers: parametre.headers });
        if(JSON.stringify(response.data).includes('500 Internal Server Error')){
            throw new Error("serveur ne reponds pas");
        }
        const info = await anime_info(response.data.data[0].node.id);
        return info;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    data : command = new SlashCommandBuilder()
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
        const nextanime = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                .setCustomId("nextanime")
                .setLabel("➡️")
                .setStyle(ButtonStyle.Success)
            );
        const resultat = await get_anime(anime_name,"0");
        if(typeof(resultat) === String){
            await interaction.reply("erreur lors de la requete");
        };
        if(!nsfw & nsfwanim.includes(resultat.rating)){
            const emb = new EmbedBuilder()
            .setDescription("nsfw anime please use a nsfw channel")
            .setFooter({text : ` "anime rechercher" : "${anime_name}", "page" : "0/100" `});
            await interaction.reply({content : " ",embeds : [emb],components : [nextanime]});
        }
        else{
            const emb = new EmbedBuilder()
            .setAuthor({name : `${resultat.title}`})
            .setDescription(`${resultat.synopsis}`)
            .setColor(0x0000FF)
            .setImage(`${resultat?.main_picture?.medium}`)
            .setFooter({text : ` "anime rechercher" : "${anime_name}", "page" : "0/100" `});
            await interaction.reply({embeds : [emb],components : [nextanime]});
        };
    },

    async excomp(interaction){
        const data = JSON.parse(`{${interaction.message.embeds[0].data.footer.text}}`);
        let off = ""
        let copanime = undefined;
        const anime_name = data["anime rechercher"];
        const nsfw = interaction.channel.nsfw;
        for(const i of data.page){
            if(i==="/"){
                break;
            }
            else{
                off += i;
            }
        };
        switch (interaction.customId){
            case "nextanime":
                off += "+1";
                break;
            case "prevanime":
                off += "-1"
                break;
        }
        off = eval(off);
        if(off === 0){
            copanime = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                .setCustomId("nextanime")
                .setLabel("➡️")
                .setStyle(ButtonStyle.Success)
            );
        }
        else{
            copanime = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                .setCustomId("prevanime")
                .setLabel("⬅️")
                .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                .setCustomId("nextanime")
                .setLabel("➡️")
                .setStyle(ButtonStyle.Success)
            );
        }
        const resultat = await get_anime(anime_name,off);
        if(!nsfw & nsfwanim.includes(resultat.rating)){
            const emb = new EmbedBuilder()
            .setDescription("nsfw anime please use a nsfw channel")
            .setFooter({text : ` "anime rechercher" : "${anime_name}", "page" : "${off}/100" `});
            await interaction.update({content : " ",embeds : [emb],components : [copanime]});
        }
        else{
            const emb = new EmbedBuilder()
            .setAuthor({name : `${resultat.title}`})
            .setDescription(`${resultat.synopsis}`)
            .setColor(0x0000FF)
            .setImage(`${resultat?.main_picture?.medium}`)
            .setFooter({text : ` "anime rechercher" : "${anime_name}", "page" : "${off}/100" `});
            await interaction.update({embeds : [emb],components : [copanime]});
        };
    },
};