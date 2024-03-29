const puppeteer = require('puppeteer');
const {identifiant,mdp,navigatorpath} = require('./config.json');

const testz = async function obj() {
    const browser = await puppeteer.launch({executablePath : navigatorpath ,headless : 'new' ,slowMo: 10 /*,product : 'chrome'*/});
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
    if (page.url() == "https://cas.monbureaunumerique.fr/login?service=https%3A%2F%2Fwww.monbureaunumerique.fr%2Fsg.do%3FPROC%3DIDENTIFICATION_FRONT&submit=Valider"){
        while (page.url() == "https://cas.monbureaunumerique.fr/login?service=https%3A%2F%2Fwww.monbureaunumerique.fr%2Fsg.do%3FPROC%3DIDENTIFICATION_FRONT&submit=Valider"){
            await page.click('.form__label');
            await page.click('#button-submit',{delay : 50})
        };
    };
    //------------------------------------------------------------------------------------------------
    /* connexion */
    await page.waitForSelector('#bouton_eleve',{visible : 'visible'});
    await page.click('#bouton_eleve',{delay : 50});
    await page.click('#username');
    await keyboard.sendCharacter(identifiant);
    await page.click('#password');
    await keyboard.sendCharacter(mdp);
    await page.click('#bouton_valider',{delay : 50});
    if (page.url() == "https://cas.monbureaunumerique.fr/saml/SAMLAssertionConsumer"){
        await page.click("body > main > div > div > div > div > div > div > div > div > div.msg__content > p:nth-child(4) > strong > a");
    }
    else{
        try{
            await page.waitForSelector('body > div.header > div.header__set > div.header__set2 > nav > div > button');
            await page.click('body > div.header > div.header__set > div.header__set2 > nav > div > button');
            await page.click("body > div.header > div.header__set > div.header__set2 > nav > div > div > ul > li:nth-child(1) > a");
        }
        catch (error){
            await page.waitForSelector('body > div.header > div.header__set > div.header__set2 > nav > div > button');
            await page.click('body > div.header > div.header__set > div.header__set2 > nav > div > button');
            await page.click("body > div.header > div.header__set > div.header__set2 > nav > div > div > ul > li:nth-child(1) > a");
        };
    };
    //-------------------------------------------------------------------------------------------------------------------------------
    await page.click("body > div.header > nav > ul.services-shortcut > li:nth-child(6) > a");
    await page.waitForSelector("#releve-eleve");
    await page.waitForSelector("#idPeriode");

    for (let i = 26;i < 29;i++){
        console.log(i);
        await page.select(`#idPeriode`,`[${i}]`);
        const note = await page.$("#releve-eleve");
        const bxnote = await note.boundingBox();
        await page.screenshot({path : `bot/image/note${i-25}.png`,clip:{x:bxnote["x"],y:bxnote["y"],width:bxnote["width"],height:bxnote["height"]}});
    };
    
    await page.click("#idPeriode");
    await browser.close()
};

//#releve-eleve
module.exports = {testz};