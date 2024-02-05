const { By, Builder, WebElementCondition, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require("assert");

(async function loginTest() {
    const options = new chrome.Options();
    options.addArguments('--headless');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get('https://courses.ultimateqa.com/users/sign_in')
        await driver.manage().window().maximize();

        let emailInput = await driver.findElement(By.css('.sign-in__form .form__group input[placeholder="Email"]'));
        await emailInput.sendKeys('example@email.com')
        console.log("enter email address")

        let passwordInput = await driver.findElement(By.css('.sign-in__form .form__group input[placeholder="Password"]'));
        await passwordInput.sendKeys('123')
        console.log("enter incorrect password")

        let signInButton = driver.findElement(By.xpath('//button[contains(text(), "Sign in")]'));
        await signInButton.click();
        console.log("click on sign in button")

        let errorMessage = await driver.findElement(By.css('.form-error__list-item'));
        await errorMessage.getText()
        console.log('get error msg:   ' + errorMessage);
        assert.equal("Invalid email or password.", errorMessage);
    } catch (e) {
        console.log(e)
    } finally {
        await driver.quit();
    }
}())
