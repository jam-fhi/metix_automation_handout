
# Test Requirements Analysis

## Requirements

### Specification Document Analysis

Prepared from metic_automation_handout.md

 1. Public Facing
	*"They are developing their public website..."*

 2. Early Stages
	*"...they are on the early stages of development..."*

 3. Management concerned about quality
	*"...but concerned about the quality of the page."*

 4. All forms should be validated
	*"Ensure that field validation is implemented before submission. Use assumptions as needed."*

 5. Clearly identified by labels at all times
	 
 6. and placeholders are to be used if suitable.

 7. The website must use the graphical resources provided by Marketing (gifs).

 8. Build an automation test suite
	*"Create and automate a test suite..."*

 9. Test Matrix
	*"...and describe the testing matrix you are referencing."*

 10. Reporting Dashboard
	*"The output of your solution should be a reporting dashboard and should contain a summary of the execution."*

 11. Identify inconsistencies
	*"Look for inconsistencies in the styles or the common elements of the page."*

 12. All of JSON content must be displayed.
	*"Ensure that all the contents of the JSON are being displayed in the page."*

 13. Use web automation tools and selenium as base.
	*"use whatever web automation tools you need, if possible use Selenium as your base framework."*

### Specification Review

#### Covered sections

In the process of building a framework and putting technology in place, the following items have been covered at the start.

1. Public Facing
	*Multiple browser support built in, though limited to Chrome and Firefox, this can easily be extended based on requirements*

3. Management converned about quality
	*The analysis of test requirements and building of a test automation framework works to alleviate this concern*

8. Build an automation framework
	*This is an on going process within this project.*

9. Test Matrix
	*This document is the beginning of a test matrix*

10. Reporting Dashboard
	*This has been implemented and tested with cucumber test result json files.*

13. Use web automation tools and selenium as a base
	*This project has been setup using cucumber, selenium and react to display a dashboard.*

#### Statements

2. Early Stages
	*While this is not a requirement, its important to keep in mind the stage of development during the creation of a automation test framework. An early stage development is likely to change and have more issues than a mature stage application.*

#### Automation Framework Requirements

 4. All forms should be validated
	*"Ensure that field validation is implemented before submission. Use assumptions as needed."*

 5. Clearly identified by labels at all times
	 
 6. and placeholders are to be used if suitable.

 7. The website must use the graphical resources provided by Marketing (gifs).

 11. Identify inconsistencies
	*"Look for inconsistencies in the styles or the common elements of the page."*

 12. All of JSON content must be displayed.
	*"Ensure that all the contents of the JSON are being displayed in the page."*

## Test Requirements

Based on the available documentation, the following test requirements have been identified.

### Test Concerns

1. All forms should be validated.
2. All forms should have clearly identified labels.
	2a. placeholders can be used.
3. Provided gifs should be used.
4. All pages should be consistent
5. All JSON file content should be displayed.

### Framework Concerns

1. Early stage development
	1a. The framework should be flexable
	1b. The framework should be fast (assuming lots of commits for continuous deployment in an early stage)
2. Reporting dashboard
3. Consistent design pattern
	3a. Allow the framework to operate independent of tests, so framework can be reused in scenarios without reworking the underlying library.