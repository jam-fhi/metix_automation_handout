## Test Design

Based on the test requirements analysis, the following designs have been implemented.

### Test Concerns

1. All forms should be validated.

	The challenge I'm having here is I can't read the error message to actually verify the validation. When I inspect the page in Chrome or Firefox the tooltip text is not visible. I guess it's set from javascript dynamically so does not show up in the elements view for the browser. I've tried accessing title, data-tip, alt attributes without any luck getting the error string to check. I think in this situation I would ask one of the developers where this text is stored and how to access it, but at present there's nothing I can do to complete this section without knowing where to read the error message text to verify it's correct for a given set of inputs.

	Login form:

		Email

			There is a very specific criteria for what makes a valid email address.

			This is a good article covering validation for email addresses:
			https://haacked.com/archive/2007/08/21/i-knew-how-to-validate-an-email-address-until-i.aspx/

		Password

			This is where assumption comes in. The index page has popups that give hints on what is valid, however for the password it only says you need to fill this in. It presently accepts any password >= 1. It does not appear to be a maximum length for the password either.

			As this is a login and not registration form, this makes sense - how would you validate an existing password without giving it away?

		The strategy here is to identify several invalid email addresses and check for the validation popup. Then using a valid email address, check for the password blank error popup.

	Contact form:

		Email

			Same as above.

		First Name

			Hard to nail down what a valid first name is. Generally first names do not include numbers or symbols
			There is no max length set on the first name field.

			The only message presented here is "Please fill in this field."

		Last Name

			Hard to nail down what a valid last name is. Generally last names do not include numbers or symbols, except for -
			There is no max length set on the last name field.

			The only message presented here is "Please fill in this field."

		Phone number

			Phone number should really just be numbers and + sign. However there are various styles of listing numbers including spaces, (, ) and - 
			There is also a definitive max length for phone numbers.

			The only message presented here is "Please fill in this field."

		Request Type

			No validation. It's a drop down choice with a default value. If I was to apply tests here it would be on the server API to check that a blank input, or input different from the provided options was handled on submission. In this framework, that's not an option.

		Message

			Free text field. There does not appear to be any validation of content at all.

			I think it should not be blank, with a minimum of 25 characters.
			Without error messages, this can't be validated automatically.


2. All forms should have clearly identified labels.
	* placeholders can be used.

	This was a reasonably straight forward process. I used xpath to look up input, select, textarea elements and corresponding labels based on the for attribute matching id or name attributes.

3. Provided gifs should be used.

	A similar approach to checking the json content has been taken here. This time the grunt task does a dir list on the resources directory to get a list of gif files to look for.

	There is a problem with this approach in that there is 1 image on the site that is not loading. Without specifications or being able to ask the marketing or dev teams what should happen here, its not possible to design an automation test specifically for this. The 2 options are either there is a typo in the file name and "-error" should not be there, or the marketing team has forgetten to provide one of their images.

	The best that can be done here is to implement a automation test to check for broken images.

	As a result there are 2 test cases running to verify that provided images are used. It's a belt and braces approach.

	Putting this one on hold just now. I'm having a lot of trouble with webdriver findElements not returing an array of img tags, so I can only seem to check the first image on the page. 

	https://stackoverflow.com/questions/35098156/get-an-array-of-elements-from-findelementby-classname

4. All pages should be consistent

	This is an awkward one to automate. I've nothing to say what it should be, so really this is just my opinion. For example the navigation link to Info Station is "Info Station" on the Home and Contact page, but it is "Information Station" on the Info Station page. Personally I'd go for "Info Station", 2 out of 3 pages use that and majority rules. That being said, this could be a snapshot of the site in development and a management decision has been made to go with Information but only 1 page is updated so far? Which seems unlikely with modern build processes, but such is the example site thats been provided. This is where automating this becomes awkward - what is the correct choice?

	All I can do here is try to document the inconsistencies and go over them with the Product Owner at a later date.

		1. Info Station navigation link is Information Station on the info.html page.
		2. Info Station has a title of "Automation Information Station" breaking convetion with Home and Contact which are titled as the navigation links. 
		3. Info Section has no header image, but it has 3 other images which makes up for the big one missing at the top. Perhaps this is on purpose?
		4. Form elements either use a name or an id attribute. It's inconsistent to switch between the 2.
		5. Site is not responsive or work on mobile displays.
		6. home and contact pages both have home-submit as button id.

5. All JSON file content should be displayed.

	A grunt task has been implemented to read the dummy-data.json file and process the expected content into a gherkin feature file that runs a scenario outline. This allows for the site content to change, such as typo's being corrected without the automation test requiring an update.

	The downside to this approach is that something like a typo would not be picked up, though it could be possible to use a spellchecker api to have some faith things are correct, but ultimately there would need to be a manual proof reading process on all site copy before it goes live. This wouldn't affect the automation tests ability to run.

	A point for future consideration here is to make the navigation of the site automated. At preset, due to time concerns for the submission deadline and practicality of hard coding 3 pages, the process is hard coded for each of the site's pages.

### Framework Concerns

1. Early stage development
	* The framework should be flexable

		Designing the framework to be flexible, with such a small scale website is hard to quantify. I think the best effort has been made to separate web driver operations from scenario steps to allow reuse of key operations and allow the framework to scale with more and more test cases. However, the proof is in the pudding as they say and this technical challenge doesn't need to scale much more than what it is just now.

	* The framework should be fast (assuming lots of commits for continuous deployment in an early stage)

		The framework is so far running at about 1 minute per run, with form validation still to be added this will increase. I'd expect the whole test suite to execute in under 2 minutes, which isn't too bad, but I expect it can be optimised to operate faster.

		The first thing to try would be headless running, e.g. https://stackoverflow.com/questions/44197253/headless-automation-with-nodejs-selenium-webdriver?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

		Second, reuse the same browser window http://tarunlalwani.com/post/reusing-existing-browser-session-selenium/

		Thirdly, I'd expect that running in docker on as a test service would give a bit of optimisation as well. There wouldn't be all the background processes going on as with my laptop.

2. Reporting dashboard

	Development log for Reporting dashboard is in framework_design_considerations.

3. Consistent design pattern
	* Allow the framework to operate independent of tests, so framework can be reused in scenarios without reworking the underlying library.

	This is discussed under the flexability statement above.