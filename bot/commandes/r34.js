const {SlashCommandBuilder,EmbedBuilder} = require("discord.js");
const axios = require('axios');

module.exports = {
    data : command = new SlashCommandBuilder()
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

        try {
            const response = await axios.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${cat}~&json=1&limit=${nb}`);
            const body = response.data;
            if(body == ""){
                await interaction.reply({content : "Categori not found"});
            } else {
                const resultat = body;
                const embed = new EmbedBuilder()
                .setAuthor({name : `${resultat[who].owner}`})
                .setImage(`${resultat[who]?.file_url}`)
                .setFooter({text : `search for ${cat}`})
                await interaction.reply({embeds : [embed]});
            }
        } catch (err) {
            console.error(err);
        }
    }
};