Feature: The site loads from express static server

Scenario: Open the website
Given I go to "http://localhost:3000"
Then the index.html page will be displayed, with title "Home"