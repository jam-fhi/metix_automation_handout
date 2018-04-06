Feature: Gif Files provided are used.

Scenario: All images should be working
Given I go to "http://localhost:3000"
Then I expect to find all images loading

Scenario Outline: Find gif on the site
Given I go to "http://localhost:3000"
Then we will find "<gif>" image on one or more of the pages
Examples:
|gif|
|build-systems-error.gif|
|overworking.gif|
|source.gif|
|thinking.gif|
