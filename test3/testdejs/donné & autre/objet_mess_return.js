const puppeteer = require('puppeteer');
const {identifiant,mdp,navigatorpath} = require('./config.json')

const testz = async function obj(rec_mess = false,num = 1) {
    let listobjt = [];
    let mess = "";
    let tempmess = '';
    const browser = await puppeteer.launch({executablePath : navigatorpath ,headless : true ,slowMo: 10 /*,product : 'chrome'*/});
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
    
    await page.waitForSelector("body > div.header > nav > ul.services-shortcut > li:nth-child(2) > a");
    await page.click("body > div.header > nav > ul.services-shortcut > li:nth-child(2) > a");

    const test = await  page.$$eval('li',element => element.map(x => x.className));
    let ok = [];
    for (let i = 0;i<test.length;i++){
      if(test[i]== "row row--full list-enhanced1__item"){
        ok.push(test[i]);
      };
    };

    if(!rec_mess){
        for (let x=1;x<25;x++){
            try{
                listobjt.push({label : (await page.$eval(`#js_boite_reception > li:nth-child(${x}) > div.col.col--xs-5 > span.text-ellipsis > a`,(d => d.textContent.trim()))).substring(0,99), value : `${x}`});
            }
            catch (e){
                console.log(e);
                break;
            };
        };
        browser.close();
        return listobjt;
    }
    else{

        await page.click(`#js_boite_reception > li:nth-child(${num}) > div.col.col--xs-5 > span.text-ellipsis > a`,{delay : 50});
        tempmess = (await page.$eval('#discussion_message0 > div.row > div',op => op.textContent));
        if(tempmess.includes('À télécharger')){
            tempmess = tempmess.substring(0,tempmess.indexOf('À télécharger'));
            mess = tempmess;
        }
        else{
            mess = tempmess;
        }
        browser.close();
        return mess;
    };
};

module.exports = {testz};
