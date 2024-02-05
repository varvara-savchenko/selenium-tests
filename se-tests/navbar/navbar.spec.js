const { By, Builder, WebElementCondition, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require("assert");

const pinkColor = "rgba(141, 60, 250, 1)"
const navbarItems = [
    { url: 'https://ultimateqa.ck.page/academy-coming-soon', text: 'Java SDET Academy' },
    { url: 'https://ultimateqa.com/fake-landing-page#', text: 'Learning' },
    { url: 'https://ultimateqa.com/testimonials/', text: 'Success Stories' },
    { url: 'https://ultimateqa.com/blog/', text: 'Blog' },
    { url: 'https://ultimateqa.com/about/', text: 'About' },
    { url: 'https://forms.clickup.com/2314027/p/f/26ktb-6387/56LKNUZ9BDYXSC73SY/unlock-your-automation-potentialwitha-free-framework-assessment', text: 'I want a free DISCOVERY SESSION' },
];

(async function navbarTest() {
    const options = new chrome.Options();
    options.addArguments('--headless');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.manage().window().maximize();
        await driver.get('https://ultimateqa.com/fake-landing-page')

        let navbar = await driver.findElement(By.id('main-menu'));
        await driver.wait(until.elementIsVisible(navbar));
        console.log("navbar is visible")

        let logo = await driver.findElement(By.css('#main-menu img'));
        await driver.wait(until.elementIsVisible(logo));
        console.log("navbar logo is visible")

        for (const item of navbarItems) {
            const link = await navbar.findElement(By.xpath(`//a[contains(text(), "${item.text}")]`));
            const href = await link.getAttribute('href');
            assert.equal(href, item.url, `Expected URL: ${item.url}, Actual URL: ${href}`);
            console.log(`URL and text for ${item.text} is correct`)
        }

        const discoverySessionLink = await driver.findElement(By.xpath('//a[contains(text(), "I want a free DISCOVERY SESSION")]'));
        const color = await discoverySessionLink.getCssValue('color');
        assert.equal(color, pinkColor);
        console.log("Discovery section has correct color")
    } catch (e) {
        console.log(e)
    } finally {
        await driver.quit();
    }
}())
