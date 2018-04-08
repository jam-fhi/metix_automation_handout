require('chromedriver');
require('geckodriver');
require('selenium-webdriver').promise;
const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const webdriver = require('selenium-webdriver');
const axios = require('axios');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const screen = {width: 640, height: 480};

setDefaultTimeout(10 * 1000);

class CustomWorld {

    constructor(options) {
        this.defaultTimeout = 10000;
        this.variable = 0;

        if(options.parameters.client === 'firefox') {
            this.driver = new webdriver.Builder()
                .forBrowser('firefox')
                .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
                .build();
        } else {
            // Run chrome by default, regardless of what options are passed in.
            this.driver = new webdriver.Builder()
                .forBrowser('chrome')
                .setChromeOptions(new chrome.Options().headless().windowSize(screen))
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

			/*

			I'm returning a true/false result here because there's no benefit to
			assert that the value is equal. Any text value I return here would be
			a substring of the body content and the indexOf test already provides
			enough information to prove that the provided text exists on the body.

			*/

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

    findInputField(tag, fieldId) {
    	const By = webdriver.By;
    	let xpath = this.getInputXpath(tag, fieldId);
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

    getInputXpath(tag, fieldId) {
	    let xpath = '//' + tag + '[@id="' + fieldId + '"]';
	    if(tag !== 'input') {
	    	xpath = '//' + tag + '[@name="' + fieldId + '"]';
	    	}
	    return xpath;
    }

    findDeadImages() {
    	const By = webdriver.By;
    	return this.driver.findElements(By.xpath('//img')).then(function(elem) {
			let pending = elem.map(function (elem) {
				return elem.getAttribute('src').then((src) => {
    				return axios.get(src).then((response) => {
						// Image loads, nothing to return here.
						return '';
    				}).catch((e) => {
    					// 404 error handled in catch.
	 					return src;
    				});
					}).catch((e) => {
						throw e;
					});
    			});
			return Promise.all(pending).then(function (allSrc) {
				let deadImg = '';
				allSrc.forEach((src) => {
					if(src !== '') {
						if(deadImg !== '') {
							deadImg += ', ';
						}
						deadImg += src;
					}
				})
        		return deadImg;
    		}).catch((e) => {
    			throw e;
    		})
    	}).catch((e) => {
    		throw e;
    	});
    }

    setInputText(tag, fieldId, text) {
    	const By = webdriver.By;
    	let xpath = this.getInputXpath(tag, fieldId);
    	return this.driver.findElement(By.xpath(xpath)).then((el) => {
    		return el.sendKeys(text);
    	}).catch((e) => {
    		throw e;
    	});
    }

    getInputErrorMessage(tag, fieldId, error) {
    	const By = webdriver.By;
    	//let xpath = this.getInputXpath(tag, fieldId);

    	/*

		Having trouble reading the validation error message.

		Even with a full wild card xpath check of the site, I can not find the error message.
 
    	*/

    	let xpath = '//*[contains(text(), "' + error + '")|contains(@*, "' + error + '")]';
    	return this.driver.findElement(By.xpath(xpath)).then((el) => {
			return error;
    		/*return el.getAttribute('title').then((alt) => {
    			console.log('Error message: ', alt);
    			if(alt.indexOf(error) >= 0) {
    				// Input error messages are partial matches, so return the
    				// matching section.

    				// Unfortunately the attributes I'm checking are always returning ''

    				return alt.substring(alt.indexOf(error), error.length);
    			} else {
    				return alt;
    			}
    		}).catch((e) => {
    			throw e;
    		});*/
    	}).catch((e) => {
    		throw e;
    	});
    }

    getPageTitle() {
        return this.driver.getTitle();
    }

    submitButton(buttonName) {
    	const By = webdriver.By;
    	const xpath = '//button[@id="' + buttonName + '"]';
    	return this.driver.findElement(By.xpath(xpath)).click();
    }
}

setWorldConstructor(CustomWorld)