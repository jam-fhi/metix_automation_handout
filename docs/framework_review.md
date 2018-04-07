# Framework Process Review

## Unfinished items

Out of the requirements identified, there are 2 parts I've not been able to do.

1. Dead images

I've had problems with selenium webdriver findElements only returning the first element it finds, rather than an array of all elements. This is preventing my test framework from identifying the broken image on the info store page.

This is a case of research until the solution is found.

I think in a real world case, the marketing team or development team would confirm the expected images, rendering the dead image check obsolete. 

I've not had that option during the process of building this framework, and checking the entire site for dead images is an interesting test case to persue.

https://stackoverflow.com/questions/35098156/get-an-array-of-elements-from-findelementby-classname

2. Validation error message

I can not read the validation error message on the page. It displays fine in the browser, so it should exist in the DOM.

At the beginning I was looking at the web page in mobile compatibilty mode for Chrome, so I never seen the tool tips being displayed, only the popup validation error message. Originally I thought I could find that element and check that the right message was present, but I couldn't. Once I spotted the tooltip I thought it would be a simple case of reading an attribute (such as alt or title) to get the validation error message, but this always returned an empty string.

Finally I've went for a wild card xpath search of the entire page.

//*[contains(text(), error) | contains(@*, error)]

This still does not return an element.

In the real world, I would just ask the dev team how to identify this element and read it. This hasn't been an option during this process.

I think that generally its bad practice to rely on tooltips and popups to display error messages. For one, its easy to over look them as they disappear quickly. Overall, I'd recommend that the validation error messages are displayed on the body within their own section, next to the input field.

## Framework Choice

For the size and scope of website that is provided for this assignment, a perfectly reasonable choice would have been a Page Object Model approach, where each page of the site is specified in a page object with methods to cover tests on that page.

There is a ready made Page Object Model package here, https://www.npmjs.com/package/selenium-cucumber-js

The choice to build a framework directly with cucumber and selenium is down to anticipating the needs of Metix rather than tripple A. My assumption is that Metix is developing applications, rather than simple sales / marketing sites, and as such there would be a more complex use case and build process for the site.

Therefore I have focused the framework on testing the features specified in the handout document.

## Test Coverage

The following aspects of the site have been covered:

	* Navigation
	* Images
	* Copy content
	* Form validation
	* Form labelling

Aspects not covered:

	* Title copy
	* External resources working (google font)
	* Background colours
	* Menu text consistency
	* Form submission / verify login works and contact requests are received

## What I would do differently next time

The main thing I would change in the future would be to place the server url in a module exports js file and change the first step to "Given I go to our site", as currently if the port number was to change then serveral files need to be updated.

The second thing would be to take more time at the beginning to setup headless execution and reuse of one browser window, simply to improve performance.

Out side of performance improvements, I think the design is working well. The webdriver wrapper methods have been reused in a number of different scnarios and all test results (even the tests that are not fully working yet) are logged and displayed on the requested dashboard.

## Future improvements

I think the biggest improvement that can be made going into the future would be setting up a docket image with all the required dependencies (version of node, grunt, selenium webdriver) installed by default so that the test framework can be quickly deployed on any machine without a install process to be completed first.