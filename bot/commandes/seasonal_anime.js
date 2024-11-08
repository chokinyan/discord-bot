const {SlashCommandBuilder , EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle} = require("discord.js");
const axios = require('axios');
const {anime_id} = require("../fichier_utilitaire/config.json");
const {anime_info} = require('../fichier_utilitaire/anime_info');
const nsfwanim = ["r","r+","rx"];


const anime = async (season, year, off) => {
    try {
        const parametre = {
            url: `https://api.myanimelist.net/v2/anime/season/${year}/${season}?limit=1&offset=${off}`,
            headers: { "X-MAL-CLIENT-ID": anime_id },
        };
        const response = await axios.get(parametre.url, { headers: parametre.headers });
        const info = await anime_info(response.data.data[0].node.id);
        return info;
    } catch (err) {
        throw err;
    }
};


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
        const year = interaction.options.getInteger('year') == null ? new Date().getFullYear() : interaction.options.getInteger('year');
        const season = interaction.options.getString('season');
        const resultat = await anime(season,year,0);
        const nsfw = interaction.channel.nsfw;
        
        const nextanimeS = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                .setCustomId("nextanimeS")
                .setLabel("➡️")
                .setStyle(ButtonStyle.Success)
            );
        if(typeof(resultat) === String){
            await interaction.reply("erreur lors de la requete");
        };
        if(!nsfw & nsfwanim.includes(resultat.rating)){
            const emb = new EmbedBuilder()
            .setDescription("nsfw anime please use a nsfw channel")
            .setFooter({text : ` "Saison rechercher" : "${season}","Lors de l'année" : "${year}", "page" : "0/100" `});
            await interaction.reply({content : " ",embeds : [emb],components : [nextanimeS]});
        }
        else{
            const emb = new EmbedBuilder()
            .setAuthor({name : `${resultat.title}`})
            .setDescription(`${resultat.synopsis}`)
            .setColor(0x0000FF)
            .setImage(`${resultat?.main_picture?.medium}`)
            .setFooter({text : ` "Saison rechercher" : "${season}", "Lors de l'année" : "${year}", "page" : "0/100" `});
            await interaction.reply({embeds : [emb],components : [nextanimeS]});
        };
    },

    async excomp(interaction){
        const data = JSON.parse(`{${interaction.message.embeds[0].data.footer.text}}`);
        let off = ""
        let copanimeS = undefined;
        const year = data["Lors de l'année"];
        const season = data["Saison rechercher"];
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
            case "nextanimeS":
                off += "+1";
                break;
            case "prevanimeS":
                off += "-1"
                break;
        }
        off = eval(off);
        if(off === 0){
            copanimeS = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                .setCustomId("nextanimeS")
                .setLabel("➡️")
                .setStyle(ButtonStyle.Success)
            );
        }
        else{
            copanimeS = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                .setCustomId("prevanimeS")
                .setLabel("⬅️")
                .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                .setCustomId("nextanimeS")
                .setLabel("➡️")
                .setStyle(ButtonStyle.Success)
            );
        }
        const resultat = await anime(season,year,off);
        if(!nsfw & nsfwanim.includes(resultat.rating)){
            const emb = new EmbedBuilder()
            .setDescription("nsfw anime please use a nsfw channel")
            .setFooter({text : ` "Saison rechercher" : "${season}", "Lors de l'année" : "${year}", "page" : "${off}/100" `});
            await interaction.update({content : " ",embeds : [emb],components : [copanimeS]});
        }
        else{
            const emb = new EmbedBuilder()
            .setAuthor({name : `${resultat.title}`})
            .setDescription(`${resultat.synopsis}`)
            .setColor(0x0000FF)
            .setImage(`${resultat?.main_picture?.medium}`)
            .setFooter({text : ` "Saison rechercher" : "${season}", "Lors de l'année" : "${year}", "page" : "${off}/100" `});
            await interaction.update({embeds : [emb],components : [copanimeS]});
        };
    },
};