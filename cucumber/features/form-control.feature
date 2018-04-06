Feature: Forms should be labelled and validated.

Scenario Outline: index.html login and contact.html form labels
Given I go to "http://localhost:3000"
And navigate to the "<page>" page
Then the "<type>" field with id "<fieldId>" will have an identified label
And the label "<fieldId>" will read "<label>"

Examples:
| page    | fieldId           | label          | type     |
| Home    | email             | Email address: | input    |
| Home    | pwd               | Password:      | input    |
| Home    | remember-me-check | Remember me    | input    |
| Contact | email             | Email:         | input    |
| Contact | name              | First Name:    | input    |
| Contact | lastName          | Last Name:     | input    |
| Contact | tel               | Phone Number:  | input    |
| Contact | requestType       | Request Type:  | select   |
| Contact | message           | Message:       | textarea |