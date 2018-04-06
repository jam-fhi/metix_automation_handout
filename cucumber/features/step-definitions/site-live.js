const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

Given('I go to {string}', function (string) {
    return this.visitPage(string).then((pageLoaded) => {
        return expect(pageLoaded).to.equal(true);
    }).catch((e) => {
        throw e;
    });
});

 Then('the index.html page will be displayed, with title {string}', function (string) {
    return this.getPageTitle().then((title) => {
        return expect(title).to.equal(string);
    }).catch((e) => {
        throw e;
    });
});