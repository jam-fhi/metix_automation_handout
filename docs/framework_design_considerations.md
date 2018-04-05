# Framework Design Considerations

### Multibrowser Support

Assuming that products will be used in a 'wild' enviornment without any control by Autonomiae Amittit Auream over what browser is used by potential clients, --world-paramenters is being used on the command line with cucumber to pass in an identifier for what browser should be run to perform the defined tests.

For the purposes of a technical challenge, this is limited to chrome and firefox as options. This could be expanded easily into Safari, IE and any other browser in the future.

Additionally no version number has been specified for the supported browsers, but this can be added to ensure exact matches with web trafic, possibly from a Google Analytics report on customer browser versions.

### Logging Test Results

Cucumber natively supports JSON output to a specified file.

Took a bit of a detour on this, I had expected it would be easy to directly set variables in the filename I was logging to. As it turns out, it wasn't. Finally went with grunt tasks, with the browser name set as an enviornment variable and the log file being copied and renamed at the end of a test run to keep a history of test results and show which browser was used for a test run.

### Project Separation

Essentially there are 4 projects in this repository.

1. Sample website + server
2. Cucumber + selenium webdriver automation test framework
3. Documentation on the process and design considerations
4. Report dashboard

In reality, I would split all of these into separate repositories and have a build process or other navigation system between them. In all likely hood, docker would be a great platform to host each of the 3 code based projects. The documentation could be hosted in docker with a markdown render, something like https://www.npmjs.com/package/markdown seems a great place to start. Perhaps if there is time, I could reconfigure things to work this way, but it seems more consistent to submit one complete repository for the assignment, rather than 4 with an additional build and operation process.

### Test Result Report Dashboard

Thinking through how this can be done, it seems there is a decent chunk of work in creating a front end UI to display my test results, or there is a decent chunk of work to setup a build process and use a framework to build the front end. The choice here is to use React as my front end framework to display my test results. While there is extra work involved to setup a build process, in the long run changes to the front end will be easier and the build process would be slightly less work than creating the front end from scratch. Therefor, I'm going with a basic React based app with a basic minimum build process - after all it's only to display test results.

### Duplication of logs

Currently, the cucumber test result logs are being duplicated. The problem encountered here is that the build process cleans the public directory and the express server is only serving up content from the cucumber/dashboard/public directory. In a production environment this probably wouldn't be a problem, an api server could serve the log files from another directory or the logs can be put into a database and severed that way. For the purposes of this technical challenge, its efficient enough to duplicate the log files into the public directory.

### Dashboard development review

Overall the process to develop a dashboard went well. The end result is clear, functional and displays the entire test process with some stats (duration and status) through all levels of the test process.

#### React dispatcher

Originally, the intent was to load each result json file into the front end. This didn't workout as planned due to the watch react and dispatchers work - you need to wait for the dispatcher to finish a dispatch before starting another. The way I made this work was to leave the loading of test results to a user action. When you click on a test summary, it triggers and dispatches and action to load in those specific test results.

#### Duration and status generation

At the beginning of the process to build the dashboard, I expected that I could take the status and duration values from individual step results and push these up the chain to display a status and duration for a scenario, feature and test run. This hit the major problem of the asyn nature of React. When I called a setDuration method via a prob to pass a value to the parent component to accumulate a total, the setDuration was called twice then the state was set. In effect it added only 1 duration to a state.duration of 0 each time. Finally I wrote a grunt task to process the cucumber result json and incude these stats within the result file at the beginning. The status value worked, but it wasn't that elegantly written and overall including these values at each stage of the test result json made the whole react dashboard simpler and a bit more elegant.

#### Durations

See also cucumber/dashboard/src/supportMethods.js

Not found documentation on what unit is being used for duration.

Divide by 1000000000 to get seconds.

From another test result, using this calculation then 
* Duration: 5.008
* Error Message: Error: function timed out, ensure the promise resolves within 5000 milliseconds

This makes sense in terms of my own experience running tests, and seems to be a sensible number of seconds for test duration. I
'll double check this at the end. There should be a documentation reference to explain.