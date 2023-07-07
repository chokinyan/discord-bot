const {SlashCommandBuilder , EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle} = require("discord.js");
const request = require('request');
const {anime_id} = require("../donné & autre/config.json");
const nsfwanim = ["r","r+","rx"];

const get_anime  = (nom,off)=>{
    return new Promise((resolve,reject)=>{
        const parametre = {
                url : `https://api.myanimelist.net/v2/anime?q='${nom}'&nsfw=true&offset=${off}`,
                headers : {"X-MAL-CLIENT-ID" : anime_id},
                json : true
        };
        request.get(parametre,(err,_rep,body)=>{
            if(JSON.stringify(body).includes('500 Internal Server Error')){
                reject("serveur ne reponds pas");
            };
            if(err){
                console.error(err);
            }
            else{
                const parametreD = {
                    url : `https://api.myanimelist.net/v2/anime/${body.data[0].node.id}?fields=title,synopsis,rank,nsfw,rating`,
                    headers : {"X-MAL-CLIENT-ID" : anime_id},
                    json : true
                }
                request.get(parametreD,(errD,_repD,bodyD)=>{
                    if(errD){
                        console.error(errD);
                    }
                    else{

                        resolve(bodyD);
                    };
                });

            };
        });
    });
};

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