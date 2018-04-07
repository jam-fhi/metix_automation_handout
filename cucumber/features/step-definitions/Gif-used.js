const { Then } = require('cucumber');
const { expect } = require('chai');

Then('we will find {string} image on one or more of the pages', function (string) {
    return this.findImageOnBody(string).then((result) => {
    	if(result === false) {
    		return this.menuNavigate('Contact').then(() => {
    			return this.findImageOnBody(string).then((result) => {
    				if(result === false) {
    					return this.menuNavigate('Info Station').then(() => {
							return this.findImageOnBody(string).then((result) => {
    							return expect(result).to.equal(true);
    						}).catch((e) => {
    							throw e;
    						});
    					}).catch((e) => {
    						throw e;
    					});
    				} else {
    					return expect(result).to.equal(true);
    				}
    			}).catch((e) => {
    				throw e;
    			});
    		}).catch((e) => {
       			throw e;
    		});
    	} else {
	        return expect(result).to.equal(true);
	    }
    }).catch((e) => {
        throw e;
    });
});

Then('I expect to find all images loading', function () {
	let deadImages = '';
    return this.findDeadImages().then((src) => {
    	console.log(src);
    	if(src !== '') {
    		if(deadImages !== '') {
    			deadImages += ', ';
    		}
    		deadImages += src;
    	}
    	return this.menuNavigate('Contact').then(() => {
    		return this.findDeadImages().then((src) => {
    			console.log(src);
    			if(src !== '') {
    				if(deadImages !== '') {
    					deadImages += ', ';
    				}    				
    				deadImages += src;
    			}
    			return this.menuNavigate('Info Station').then(() => {
					return this.findDeadImages().then((src) => {
						console.log(src);
						if(src !== '') {
    						if(deadImages !== '') {
    							deadImages += ', ';
    						}							
    						deadImages += src;
    					}
    					return expect(deadImages).to.equal('');
					}).catch((e) => {
						throw e;
    				});
    			}).catch((e) => {
    				throw e;
    			});
    		}).catch((e) => {
    			throw e;
    		});
    	}).catch((e) => {
       		throw e;
    	});
    }).catch((e) => {
        throw e;
    });   
});