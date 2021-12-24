const puppeteer = require('puppeteer')

async function scapeAnime(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="#area5114"]/img')
    const src = await el.getProperty('src')
    const srcImgURL = await src.jsonValue()

    
    const [el2] = await page.$x('/html/body/div[1]/div[2]/div[3]/div[2]/div[4]/table/tbody/tr[2]/td[2]/div/div[2]/h3/a')
    const title = await el2.getProperty('textContent')
    const animeTitle = await title.jsonValue()

    const [el3] = await page.$x('//*[@id="content"]/div[4]/table/tbody/tr[2]/td[1]/span')
    const ranking = await el3.getProperty('textContent')
    const animeRanking = await ranking.jsonValue()

    await browser.close()

    console.log({animeRanking, animeTitle, srcImgURL})
}

scapeAnime('https://myanimelist.net/topanime.php')