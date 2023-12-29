const puppeteer = require('puppeteer');
const {identifiant,mdp,navigatorpath} = require('../bot/donné & autre/config.json');
let listmess = [];
let listauto = [];

// executablePath : 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'

/*test = (async () => {
  const browser = await puppeteer.launch({executablePath : 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',headless : false});
  const page = await browser.newPage();

  await page.goto('https://developer.chrome.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.search-box__link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );

  const fullTitle = await textSelector.evaluate(el => el.textContent);
    
  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

})();*/
 

test = (async () => {
  const browser = await puppeteer.launch({executablePath : navigatorpath ,headless : false ,slowMo: 10 ,product : 'chrome'});
  const page = await browser.newPage();
  const keyboard = page.keyboard;
  await page.goto("https://www.monbureaunumerique.fr/");
  await page.setViewport({width: 1000, height: 1000});
  //-----------------------------------------------------------------------------------------------
  /* choix du lieux */
  await page.click(".fo-connect__link");
  //await page.waitForSelector('.form__label',{visible : 'visible'});
  //await page.click('.form__label');
  //await page.click('#button-submit',{delay : 50});
  //while (page.url() == "https://cas.monbureaunumerique.fr/login?service=https%3A%2F%2Fwww.monbureaunumerique.fr%2Fsg.do%3FPROC%3DIDENTIFICATION_FRONT&submit=Valider"){
  //  await page.click('.form__label');
  //  await page.click('#button-submit',{delay : 50})
  //};
  ////------------------------------------------------------------------------------------------------
  ///* connexion */
  //await page.waitForSelector('#bouton_eleve',{visible : 'visible'});
  //await page.click('#bouton_eleve',{delay : 50});
  //await page.click('#username');
  //await keyboard.sendCharacter(identifiant);
  //await page.click('#password');
  //await keyboard.sendCharacter(mdp);
  //await page.click('#bouton_valider',{delay : 50});
  //if (page.url() == "https://cas.monbureaunumerique.fr/saml/SAMLAssertionConsumer") {
  //  await page.click("body > main > div > div > div > div > div > div > div > div > div.msg__content > p:nth-child(4) > strong > a");
  //}
  //else {
  //  await page.waitForSelector('body > div.header > div.header__set > div.header__set2 > nav > div > button');
  //  await page.click('body > div.header > div.header__set > div.header__set2 > nav > div > button');
  //  await page.click("body > div.header > div.header__set > div.header__set2 > nav > div > div > ul > li:nth-child(1) > a");
  //}
  //await browser.close();
  
})();


module.exports = {test};