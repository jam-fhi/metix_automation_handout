const { Then } = require('cucumber');
const { expect } = require('chai');

Then('we will find {string} on one or more of the pages', function (string) {
	// On a larger site or app, this would be dynamically. Possibly reading
	// a site map or a navigation section to get a list of links to load.
	// As a first implementation of this test and with only 3 pages, it
	// is more time efficient to hard code the links. If there's time later
	// this can be updated to dynamically read the menu.
    return this.findTextOnBody(string, false).then((result) => {
    	if(result === false) {
    		return this.menuNavigate('Contact').then(() => {
    			return this.findTextOnBody(string, false).then((result) => {
    				if(result === false) {
    					return this.menuNavigate('Info Station').then(() => {
							return this.findTextOnBody(string, false).then((result) => {
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