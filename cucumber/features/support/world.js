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
        const By = webdriver.By;
        // Default chrome error title is url without port
        const serverAddr = pageUrl.indexOf('http') === 0 ? pageUrl.substring(pageUrl.indexOf(':') + 3, pageUrl.lastIndexOf(':')) : pageUrl.substring(0, pageUrl.indexOf(':'));
        return this.driver.wait(this.driver.get(pageUrl), this.defaultTimeout).then((el) => {
            return this.driver.getTitle().then((title) => {
                // Firefox error title is 'Problem loading page'
                if(title.indexOf(serverAddr) >= 0 || title.indexOf('Problem loading') >= 0) {
                    return false;
                } else {
                    return true;
            }}).catch((e) => {
                throw e;
            });
        }).catch((e) => {
            throw e;
        });
    }

    getPageTitle() {
        return this.driver.getTitle();
    }
}

setWorldConstructor(CustomWorld)