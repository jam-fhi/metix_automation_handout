const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

Given('I got to {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    this.visitPage(string);
    return 'pass';
});

Then('the index.html page will be displayed', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});