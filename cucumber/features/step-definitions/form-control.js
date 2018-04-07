const { Given, Then } = require('cucumber');    
const { expect } = require('chai');

Given('navigate to the {string} page', function (string) {
	return this.menuNavigate(string).then(() => {
		return this.getPageTitle().then((title) => {
			return expect(title).to.equal(string);
		}).catch((e) => {
			throw e;
		});
	}).catch((e) => {
		throw e;
	})
});

Then('the {string} field with id {string} will have an identified label', function (string, string2) {
	return this.findInputField(string, string2).then((fieldResult) => {
		return this.findInputLabel(string2).then((labelResult) => {
			return expect(fieldResult).to.equal(labelResult);
		}).catch((e) => {
			throw e;
		});
	}).catch((e) => {
		throw e;
	});
});

Then('the label {string} will read {string}', function (string, string2) {
	return this.getLabelText(string).then((result) => {
		return expect(string2).to.equal(result);
	}).catch((e) => { throw e; });
});

Then('when {string} and the form is submitted the result will be {string}', function (string, string2) {
	return this.setInputText('input', 'email', string).then((el) => {
		return this.submitButton('home-submit').then((elem) => {
			return this.findTextOnBody(string2, true).then((result) => {
				// Not a great way to do this. Currently, I've been unable to
				// find an id for the validation error message and looking
				// for the text on the body never returns anything.
				// I'll come back to this at the end.
				return expect(result).to.equal(true);
			}). catch((e) => {
				throw e;
			});
		}).catch((e) => { 
			throw e;
		});
	}).catch((e) => {
		throw e;
	});
});

Then('when {string} and {string} are entered, on submit the result will be {string}', function (string, string2, string3) {
	return this.setInputText('input', 'email', string).then((el) => {
		return this.setInputText('input', 'pwd', string2).then((el) => {
			return this.submitButton('home-submit').then((elem) => {
				return this.findTextOnBody(string3, true).then((result) => {
					// Not a great way to do this. Currently, I've been unable to
					// find an id for the validation error message and looking
					// for the text on the body never returns anything.
					// I'll come back to this at the end.
					return expect(result).to.equal(true);
				}). catch((e) => {
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