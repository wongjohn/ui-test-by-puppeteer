/**
 * 下面是使用 puppeteer 的一个例子
 */
const puppeteer = require('puppeteer');

(async() => {
    // 1、打开 浏览器
    const browser = await puppeteer.launch({headless: true});
    // 2、打开 新页面
    const page = await browser.newPage();
    // 3、网址跳转到 百度
    await page.goto('https://www.baidu.com');
    // 4、在 百度的搜索框 输入 Puppeteer
    await page.type('#kw', 'Puppeteer', {delay: 50});
    // 5、点击 "百度一下" 按钮
    await page.click('#su');

    // 6、等待 1秒钟，等待百度传输结果
    await page.waitFor(1000);

    // 7、抽取所有结果的"标题"和"链接"
    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('.c-container h3.t a'));
        return anchors.map(anchor => anchor.textContent);
    });

    // 8、期待有结果
    console.log(links.join('\n'));

    // 9、关闭浏览器
    await browser.close();
})();
