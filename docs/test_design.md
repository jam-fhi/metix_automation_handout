## Test Design

Based on the test requirements analysis, the following designs have been implemented.

### Test Concerns

1. All forms should be validated.
2. All forms should have clearly identified labels.
	* placeholders can be used.
3. Provided gifs should be used.

A similar approach to checking the json content has been taken here. This time the grunt task does a dir list on the resources directory to get a list of gif files to look for.

There is a problem with this approach in that there is 1 image on the site that is not loading. Without specifications or being able to ask the marketing or dev teams what should happen here, its not possible to design an automation test specifically for this. The 2 options are either there is a typo in the file name and "-error" should not be there, or the marketing team has forgetten to provide one of their images.

The best that can be done here is to implement a automation test to check for broken images.

As a result there are 2 test cases running to verify that provided images are used. It's a belt and braces approach.

Putting this one on hold just now. I'm having a lot of trouble with webdriver findElements not returing an array of img tags, so I can only seem to check the first image on the page. 

https://stackoverflow.com/questions/35098156/get-an-array-of-elements-from-findelementby-classname

4. All pages should be consistent
5. All JSON file content should be displayed.

A grunt task has been implemented to read the dummy-data.json file and process the expected content into a gherkin feature file that runs a scenario outline. This allows for the site content to change, such as typo's being corrected without the automation test requiring an update.

The downside to this approach is that something like a typo would not be picked up, though it could be possible to use a spellchecker api to have some faith things are correct, but ultimately there would need to be a manual proof reading process on all site copy before it goes live. This wouldn't affect the automation tests ability to run.

A point for future consideration here is to make the navigation of the site automated. At preset, due to time concerns for the submission deadline and practicality of hard coding 3 pages, the process is hard coded for each of the site's pages.

### Framework Concerns

1. Early stage development
	* The framework should be flexable
	* The framework should be fast (assuming lots of commits for continuous deployment in an early stage)
2. Reporting dashboard
3. Consistent design pattern
	* Allow the framework to operate independent of tests, so framework can be reused in scenarios without reworking the underlying library.