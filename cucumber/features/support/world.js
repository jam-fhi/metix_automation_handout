require('chromedriver');
const { setWorldConstructor } = require('cucumber');
const webdriver = require('selenium-webdriver');
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

class CustomWorld {
    constructor() {
        this.defaultTimeout = 5000;
        this.variable = 0;
    }

    visitPage(pageUrl) {
        const until = webdriver.until;
        var el = driver.wait(driver.get(pageUrl), this.defaultTimeout);
        return el;
    }
}

setWorldConstructor(CustomWorld)