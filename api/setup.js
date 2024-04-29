const fs = require('fs');
const chrome = require('selenium-webdriver/chrome');
const { Builder, By } = require('selenium-webdriver');
const { urls, teamtailorAPI } = require('../fixtures/data/common');

describe('Setup env file', function() {
    let driver;
    let tokenAPI

    before(async function() {
        let chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--headless', '--disable-gpu', '--no-sandbox');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    });

    it('Get token from careers webpage', async function() {
        const careersPage = `${urls.base}${urls.careers}`
        await driver.get(careersPage);
        const element = await driver.findElement(By.className('teamtailor-jobs-widget'));
        tokenAPI = await element.getAttribute('data-teamtailor-api-key');
    });

    it('Save data on .env file', async function() {
        if (fs.existsSync('api/.env')) {
            fs.unlinkSync('api/.env');
        }
        fs.writeFileSync('api/.env', `TOKEN=${tokenAPI}\nBASE_URL=${teamtailorAPI.base}`);
    })

    after(async function() {
        await driver.quit();
    });
});
