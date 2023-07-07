const {SlashCommandBuilder,EmbedBuilder} = require("discord.js");
const request = require('request');

module.exports = {
    data : test = new SlashCommandBuilder()
    .setName("r34")
    .setDescription("rule34")
    .setNSFW(true)
    .addStringOption(option=>
        option.setName("categoris")
        .setDescription("name of catégories or caracter to search")
        .setRequired(true)
    ),

    async excute(interaction){
        const nb = Math.floor(Math.random()*1000);
        const who = Math.floor(Math.random()*nb);
        let cat = interaction.options.getString('categoris');
        for(let i=0;i<cat.length;i++){cat = cat.replace(" ","_")};

        request.get({url : `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${cat}~&json=1&limit=${nb}`},async (err,_rep,body)=>{
            if(err){
                console.error(err);
            }
            else{
                if(body == ""){
                    await interaction.reply({content : "Categori not found"});
                }
                else{
                    const resultat = JSON.parse(body);
                    const embed = new EmbedBuilder()
                    .setAuthor({name : `${resultat[who].owner}`})
                    .setImage(`${resultat[who]?.file_url}`)
                    .setFooter({text : `search for ${cat}`})
                    await interaction.reply({embeds : [embed]});
                };
            };
        });
    }
};