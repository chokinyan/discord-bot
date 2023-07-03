const {SlashCommandBuilder , EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle} = require("discord.js");
const request = require('request');
const {anime_id} = require("../donné & autre/config.json");
const {sleep} = require("../donné & autre/wait");
const nsfwanim = ["r","r+","rx"];

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
        const nextanime = new ActionRowBuilder()
                            .setComponents(
                                new ButtonBuilder()
                                .setCustomId("nextanime")
                                .setLabel("➡️")
                                .setStyle(ButtonStyle.Success)
                            );
        const parametre_P = {
            url : `https://api.myanimelist.net/v2/anime?q='${anime_name}'&nsfw=true&offset=0`,
            headers : {"X-MAL-CLIENT-ID" : anime_id}
        };
        request.get(parametre_P,(err,_repp,body) =>{
            if(err){
                console.log(err);
            }
            else{
                const res = JSON.parse(body);
                const animesrc_id = res?.data[0].node.id;
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
                            const emb = new EmbedBuilder()
                            .setDescription("nsfw anime please use a nsfw channel")
                            .setFooter({text : ` "anime rechercher" : "${anime_name}", "page" : "0/100" `});
                            await interaction.reply({content : " ",embeds : [emb],components : [nextanime]});
                        }
                        else{
                            const emb = new EmbedBuilder()
                            .setAuthor({name : resultat.title})
                            .setDescription(resultat.synopsis)
                            .setColor(0x0000FF)
                            .setImage(resultat?.main_picture?.medium)
                            .setFooter({text : ` "anime rechercher" : "${anime_name}", "page" : "0/100" `});
                            await interaction.reply({embeds : [emb],components : [nextanime]});
                        };
                    };
                });
                
            }
        });
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
                            const emb = new EmbedBuilder()
                            .setDescription("nsfw anime please use a nsfw channel")
                            .setFooter({text : ` "anime rechercher" : "${anime_name}", "page" : "${off}/100" `});
                            await interaction.update({content : " ",embeds : [emb],components : [copanime]});
                        }
                        else{
                            const emb = new EmbedBuilder()
                            .setAuthor({name : resultat.title})
                            .setDescription(resultat.synopsis)
                            .setColor(0x0000FF)
                            .setImage(resultat?.main_picture?.medium)
                            .setFooter({text : ` "anime rechercher" : "${anime_name}", "page" : "${off}/100" `});
                            await interaction.update({embeds : [emb],components : [copanime]});
                        };
                    };
                });
            }
        });
    },
};