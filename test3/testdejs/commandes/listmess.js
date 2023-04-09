const {SlashCommandBuilder} = require("discord.js");
const puppeteer = require('puppeteer');
const {identifiant,mdp} = require('../donné & autre/config.json');
let listmess = [];
let listauto = [];

module.exports = {
    data : test = new SlashCommandBuilder()
        .setName("list_message")
        .setDescription("list des message de la premier page")
        .addIntegerOption(option =>
            option.setName('nbmess')
            .setDescription('nombre de message a affichier (entre 1 et 50) ce ne sont que les auteurs et objets')
            .setMinValue(1)
            .setMaxValue(50)
            ),

    async excute(interaction){
        interaction.reply({content :`une fois les objet et auteur des ${interaction.options.getInteger('nbmess')} messages, ils vous seront envoyé en dm par le bot`, ephemeral: true})
        const browser = await puppeteer.launch({executablePath : 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe' ,headless : true ,slowMo: 10 ,product : 'chrome'});
            const page = await browser.newPage();
            const keyboard = page.keyboard
            await page.goto("https://www.monbureaunumerique.fr/");
            await page.setViewport({width: 1000, height: 1000});
            //-----------------------------------------------------------------------------------------------
            /* choix du lieux */
            await page.click(".fo-connect__link");
            await page.waitForSelector('.form__label',{visible : 'visible'});
            await page.click('.form__label');
            await page.click('#button-submit',{delay : 50});
            while (page.url() == "https://cas.monbureaunumerique.fr/login?service=https%3A%2F%2Fwww.monbureaunumerique.fr%2Fsg.do%3FPROC%3DIDENTIFICATION_FRONT&submit=Valider"){
                await page.click('.form__label');
                await page.click('#button-submit',{delay : 50})
            };
            //------------------------------------------------------------------------------------------------
            /* connexion */
            await page.waitForSelector('#bouton_eleve',{visible : 'visible'});
            await page.click('#bouton_eleve',{delay : 50});
            await page.click('#username');
            await keyboard.sendCharacter(identifiant);
            await page.click('#password');
            await keyboard.sendCharacter(mdp);
            //console.log("arfzafzafe");
            await page.click('#bouton_valider',{delay : 50});
            if (page.url() == "https://cas.monbureaunumerique.fr/saml/SAMLAssertionConsumer"){
                await page.click("body > main > div > div > div > div > div > div > div > div > div.msg__content > p:nth-child(4) > strong > a");
            }
            else{
                await page.waitForSelector('body > div.header > div.header__set > div.header__set2 > nav > div > button');
                await page.click('body > div.header > div.header__set > div.header__set2 > nav > div > button');
                await page.click("body > div.header > div.header__set > div.header__set2 > nav > div > div > ul > li:nth-child(1) > a");;

            };
            
            await page.click("body > div.header > nav > ul.services-shortcut > li:nth-child(2) > a");

            for (let x=1;x<interaction.options.getInteger('nbmess');x++){
                listmess.push(await page.$eval(`#js_boite_reception > li:nth-child(${x}) > div.col.col--xs-5 > span.text-ellipsis > a`,(d => d.textContent.trim())))
                listauto.push(await page.$eval(`#js_boite_reception > li:nth-child(${x}) > div.col--xs-3.col--full > span > span:nth-child(7)`,(e => e.textContent.trim())));
            };

            await browser.close();

            for(let x = 0; x < interaction.options.getInteger("nbmess") ; x++){
                interaction.user.send(`auteur : ${listauto[x]}\n objet : ${listmess[x]}`);
            };
    },
};