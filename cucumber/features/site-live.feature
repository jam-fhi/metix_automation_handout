Feature: The site loads from express static server

Scenario: Open the website
Given I got to "http://localhost:3000"
Then the index.html page will be displayed