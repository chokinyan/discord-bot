const puppeteer = require('puppeteer');
const {navigatorpath} = require('./config.json')

res = async function result(vois = undefined,depart = undefined){
    const browser = await puppeteer.launch({executablePath : navigatorpath ,headless : false ,slowMo: 10});
    const page = await browser.newPage();
    const keyboard = page.keyboard;
    await page.setViewport({width : 1000,height : 1000});
    const list_v = {
                    };
    await page.goto(`https://cyclades.education.gouv.fr/candidat/publication/accueil?isExam=examens&step=3&type=${list_v[vois]}`);
    //----------------------------------------------------------------------------------------------------------------------------------------------------
    
};