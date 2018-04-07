require('chromedriver');
require('geckodriver');
const { setWorldConstructor } = require('cucumber');
const webdriver = require('selenium-webdriver');
const axios = require('axios');

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
    	const promise = require('selenium-webdriver').promise;
    	let pendingElements = this.driver.findElement(By.xpath('//img'));

    	/*

    	Lost in a previous commit, where I removed commented out sections.

    	axios.get(imgSrc).then((response) => {
			return true;
    	}).catch((e) => {
	 		return false;
    	});

		This section needs more work. Having a problem reading an array of all
		img tags on the page.

    	*/

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