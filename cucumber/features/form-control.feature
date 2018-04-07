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

Scenario Outline: index.html login form should validate email inputs
Given I go to "http://localhost:3000"
And navigate to the "Home" page
Then when "<email>" and the form is submitted the result will be "<message>"

Examples:
| email                     | message                                   |
|                           | Please fill in this field.                |
| !def!xyz%abc@example.com  |                                           |
| john smith @ example..com | A part followed by '@' should not contain |
| jamie                     | Please include an '@'                     |
| @jamie...uk               | Please enter a part followed by '@'       |

Scenario Outline: index.html login form should validate password inputs
Given I go to "http://localhost:3000"
And navigate to the "Home" page
Then when "!def!xyz%abc@example.com" and "<password>" are entered, on submit the result will be "<message>"

Examples:
| password | message                    |
|          | Please fill in this field. |
| a        |                            |
| 1        |                            |
| $        |                            |