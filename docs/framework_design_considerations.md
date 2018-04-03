# Framework Design Considerations

### Multibrowser Support

Assuming that products will be used in a 'wild' enviornment without any control by Autonomiae Amittit Auream over what browser is used by potential clients, --world-paramenters is being used on the command line with cucumber to pass in an identifier for what browser should be run to perform the defined tests.

For the purposes of a technical challenge, this is limited to chrome and firefox as options. This could be expanded easily into Safari, IE and any other browser in the future.

Additionally no version number has been specified for the supported browsers, but this can be added to ensure exact matches with web trafic, possibly from a Google Analytics report on customer browser versions.

### Logging Test Results

Cucumber natively supports JSON output to a specified file.

Took a bit of a detour on this, I had expected it would be easy to directly set variables in the filename I was logging to. As it turns out, it wasn't. Finally went with grunt tasks, with the browser name set as an enviornment variable and the log file being copied and renamed at the end of a test run to keep a history of test results and show which browser was used for a test run.