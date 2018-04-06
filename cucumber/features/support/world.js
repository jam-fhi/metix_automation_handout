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

/*
    imageExists(imgSrc) {
	    return new Promise((resolve, reject) => {
    	    let xhr = new XMLHttpRequest();
        	xhr.open("HEAD", imgSrc);

        	xhr.onload = () => {
                resolve(false);
        	};
        	xhr.onerror = () => reject(true);
        	xhr.send();
    	});
	}
*/
/*
	imageExists(imageSrc){
		const http = new XMLHttpRequest();

    	http.open('HEAD', this.getImageURL(imageSrc), false);
    	http.send();

    	return http.status != 404;
	}
*/
/*
	getImageURL(src) {
		const imgSrc = src.substring(1, src.length);
		return this.serverURL + imgSrc;
	}
*/
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

/*

    	.then((el) => {
    		return el.map((elem) => {
    			elem.getAttribute('src').then((src) => {
    				return axios.get(src).then((response) => {
    					console.log('image exists', src);
    					return '';
    				}).catch((e) => { 
    					// Returning a value here, as this is what
    					// we need to know an image is broken.
    					console.log('Error', e.config.url, 'End Error'); 
    					return e.config.url;
    					//throw e.cnfig.url; 
    				});
    			}).catch((e) => { throw e; });
    		}).catch((e) => { throw e; });
    	}).catch((e) => { throw e; });*/
    }

    getPageTitle() {
        return this.driver.getTitle();
    }
}

setWorldConstructor(CustomWorld)