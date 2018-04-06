Feature: Forms should be labelled and validated.

Scenario Outline: index.html login and contact.html form labels
Given I go to "http://localhost:3000"
And navigate to the "<page>" page
Then the "<fieldId>" field will have an identified label
And the label "<fieldId>" will read "<label>"

Examples:
| page    | fieldId           | label          |
| Home    | email             | Email address: |
| Home    | pwd               | Password:      |
| Home    | remember-me-check | Remember me    |
| Contact | email             | Email:         |
| Contact | name              | First Name:    |
| Contact | lastName          | Last Name:     |
| Contact | tel               | Phone Number:  |
| Contact | requestType       | Request Type:  |
| Contact | message           | Message:       |