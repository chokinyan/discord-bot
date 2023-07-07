const {SlashCommandBuilder} = require("discord.js");
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
        let cat = interaction.options.getString('categoris');
        for(let i=0;i<cat.length;i++){cat = cat.replace(" ","_")};
        console.log(cat);

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
                    await interaction.reply({content : `${resultat[0]?.file_url}`});
                }
            };
        });
    }
};