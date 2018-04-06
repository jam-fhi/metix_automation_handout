Feature: The site loads from express static server111

Scenario: Open the website1
Given I go to "http://localhost:3000"
Then the index.html page will be displayed, with title "Home"

Scenario Outline: Open the website2
Given I go to "<url>"
Then the index.html page will be displayed, with title "<title>"

Examples:
|url|title|
|http://localhost:3000|Home1|
|http://localhost:3000|Home2|