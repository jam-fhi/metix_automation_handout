# metix_automation_handout

## Commands

#### start

This command starts an express server to statically serve the sample website

#### testChrome or testFireFox

This command runs the cucumber test framework, each command runs the specified browser.

#### testServerChrome or testServerFireFox

This command uses the concurrently package to run the server and then run the test framework. Each command runs the specified browser.

## Dependencies

#### NodeJS v8+

The latest selenium webdriver package requires v8 or above in order to use the asyc function.

Details of the issue are here: https://stackoverflow.com/questions/48542631/syntaxerror-unexpected-identifier-in-selenium-webdriver-lib-http-js454-async-e

#### NVM (Node Version Manager)

In case its needed.

https://danielarancibia.wordpress.com/2017/03/28/install-or-upgrade-nodejs-with-nvm-for-windows/
https://github.com/coreybutler/nvm-windows/releases

Run:

nvm install latest
nvm use 9.10.1