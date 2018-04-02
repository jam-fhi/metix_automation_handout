require('chromedriver');
require('geckodriver');
const { setWorldConstructor } = require('cucumber');
const webdriver = require('selenium-webdriver');

class CustomWorld {
    constructor(options) {
        this.defaultTimeout = 5000;
        this.variable = 0;

        if(options.parameters.client === 'firefox') {
            this.driver = new webdriver.Builder()
                .forBrowser('firefox')
                .build();
        } else {
            // Run chrome by default, regardless of what options are passed in.
            this.driver = new webdriver.Builder()
                .forBrowser('chrome')
                .build();
        }
    }

    visitPage(pageUrl) {
        const until = webdriver.until;
        const el = this.driver.wait(this.driver.get(pageUrl), this.defaultTimeout);
        return el;
    }
}

setWorldConstructor(CustomWorld)