const puppeteer = require('puppeteer');
const ignoreImg = require('./lib/request/ignoreImg');

const pageParser = require('./lib/parser/pageParser');
const contentParser = require('./lib/parser/contentParser');

let config = {
    pages: 1,
    nowPage: 1,
    isHeadless: true,
    interval: 1
};

console.log(`
Headless ${config.isHeadless} /
pages ${config.pages}
`);

(async () => {
    const browser = await puppeteer.launch({
        headless: config.isHeadless
    });
    const request = async config => {
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', ignoreImg);
        const crawler = Object.assign({}, config);
        const currentTarget = `https://movies.yahoo.com.tw/movie_intheaters.html?page=${crawler.nowPage}`;
        
        console.log(`crawler to ${currentTarget}...`);

        let p = await page.goto(currentTarget, {
            waitUntil: 'domcontentloaded',
            timeout: 0
        });
        if ((await p.status()) >= 400) {
            console.log('this page not found');
        }
        const pageInfo = await page.evaluate(pageParser);
        const contentInfo = [];
        for (let i = 0; i < pageInfo.links.length; i++) {
            let content = await page.goto(pageInfo.links[i].link, {
                waitUntil: 'domcontentloaded',
                timeout: 0
            });
            if ((await content.status()) >= 400) {
                console.log('this page not found');
                continue;
            };
            contentInfo.push(await page.evaluate(contentParser));
        };
        console.log(contentInfo); //====================
        page.close();

        return crawler;
    }


    let interval = setInterval(() => {
        request(config).then(() => config.nowPage++);
        if (config.pages === config.nowPage) {
            clearInterval(interval);
            // browser.close();
            console.log(`Work is done.`)
        }
    }, config.interval * 1000);

})();