require('chromedriver');
require('geckodriver');
const { setWorldConstructor } = require('cucumber');
const webdriver = require('selenium-webdriver');
const axios = require('axios');

class CustomWorld {
    constructor(options) {
        this.defaultTimeout = 5000;
        this.variable = 0;
        this.serverURL;

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

    setServerURL(url) {
    	this.serverURL = url;
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

    menuNavigate(linkName) {
    	const By = webdriver.By;
    	const xpath = '//body/div/a[text()="' + linkName + '"]';
    	return this.driver.findElement(By.xpath(xpath)).click();
    }

    findTextOnBody(test) {
    	const By = webdriver.By;
		return this.driver.findElement(By.tagName("body")).getText().then((text) => {
			if(text.indexOf(test) >= 0) {
				return true;
			} else {
				return false;
			}
		}).catch((e) => {
			// Return false here, instead of throwing an error
			// This lets the calling method continue to the 
			// next page.			
			return false;
			//throw e;
		});
    }

    findImageOnBody(src) {
    	const By = webdriver.By;
    	const xpath = '//img[contains(@src, "' + src + '")]';
		return this.driver.findElement(By.xpath(xpath)).then((el) => {
			if(typeof(el) === "object") {
				return true;
			} else {
				return false;
			}
		}).catch((e) => {
			// Return false here, instead of throwing an error
			// This lets the calling method continue to the 
			// next page.
			return false;
			//throw e;
		});
    }

    getLabelText(labelId) {
    	const By = webdriver.By;
    	const xpath = '//label[@for="' + labelId + '"]';
		return this.driver.findElement(By.xpath(xpath)).then((el) => {
			if(typeof(el) === "object") {
				return el.getText();
			} else {
				return '';
			}
		}).catch((e) => {
			throw e;
		});
    }

    findInputLabel(labelId) {
    	const By = webdriver.By;
    	const xpath = '//label[@for="' + labelId + '"]';
		return this.driver.findElement(By.xpath(xpath)).then((el) => {
			if(typeof(el) === "object") {
				return true;
			} else {
				return false;
			}
		}).catch((e) => {
			throw e;
		});
    }

    findInputField(fieldId) {
    	const By = webdriver.By;
    	const xpath = '//input[@id="' + fieldId + '"]';
		return this.driver.findElement(By.xpath(xpath)).then((el) => {
			if(typeof(el) === "object") {
				return true;
			} else {
				return false;
			}
		}).catch((e) => {
			throw e;
		});
    }

    findDeadImages() {
    	const By = webdriver.By;
    	const promise = require('selenium-webdriver').promise;
    	let pendingElements = this.driver.findElement(By.xpath('//img'));

    	return pendingElements.then(function (elements) {
    		let pendingImg = elements.map(function (elem) {
        		return elem.getAttribute('src');
    			});
    		return promise.all(pendingImg).then(function (allSrc) {
    			console.log(allSrc);
        		return allSrc;
    		});
		});
    }

    getPageTitle() {
        return this.driver.getTitle();
    }
}

setWorldConstructor(CustomWorld)