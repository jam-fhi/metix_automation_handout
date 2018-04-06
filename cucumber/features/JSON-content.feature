Feature: dummy-data json content must be on the site

Scenario Outline: Find content on site
Given I go to "http://localhost:3000"
Then we will find "<content>" on one or more of the pages
Examples:
|content|
|Solving problems manually?|
|Grinding out time-consuming individual solutions?|
|Design a system to solve them for you!|
|Trying to handle too many requests at once?|
|Testing a complicated platform?|
|Build a system to handle every operation concurrently!|
|From a button press...|
|...Test and execute all your commands...|
|...While you take it easy!|
