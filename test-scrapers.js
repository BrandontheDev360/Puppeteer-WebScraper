const puppeteer = require('puppeteer')
const fs = require('fs/promises')


async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://myanimelist.net/topanime.php')
    // Anime Descriptions Text List
    const animeDesc = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".detail")).map(x => x.textContent)
    })

    await fs.writeFile('animelist.txt', animeDesc.join('\r\n'))
    // Anime Pics Download Pics cant get to work just only downloads one
    const animePics= await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".lazyloaded")).map(x => x.src)
    })

    for (const animePic of animePics) {
        const imagepage = await page.goto(animePic)
        await fs.writeFile(`hi.png`, await imagepage.buffer())
    }

    await browser.close()
}

start()