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

Scenario Outline: form should validate inputs
Given I go to "http://localhost:3000"
And navigate to the "<page>" page
Then when "<type>" with id "<fieldId>" is populated with "<value>" then the result will be "<message>"

Examples:
| page | type  | fieldId | value                     | message                                   |
| Home | input | email   |                           | Please fill in this field                 |
| Home | input | email   | !def!xyz%abc@example.com  |                                           |
| Home | input | email   | john smith @ example..com | A part followed by '@' should not contain |
| Home | input | email   | jamie                     | Please include an '@'                     |
| Home | input | email   | @jamie...uk               | Please enter a part followed by '@'       |
| Home | input | pwd     | a                         |                                           |
| Home | input | pwd     | 1                         |                                           |
| Home | input | pwd     | $                         |                                           |
| Home | input | pwd     |                           | Please fill in this field                 |