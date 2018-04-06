## Test Design

Based on the test requirements analysis, the following designs have been implemented.

### Test Concerns

1. All forms should be validated.
2. All forms should have clearly identified labels.
	* placeholders can be used.
3. Provided gifs should be used.
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