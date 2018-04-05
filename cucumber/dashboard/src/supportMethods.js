export function getDuration(durationLong) {

	// Not found documentation on what unit is being used for duration.
	// This makes sense in terms of my own experience running tests, and seems
	// to be a sensible number of seconds for test duration. I'll double check
	// this at the end. There should be a documentation reference to explain.
	// From another test result, using this calculation then Duration: 5.008
	// Error Message: Error: function timed out, ensure the promise resolves 
	// within 5000 milliseconds
	
	let duration = durationLong / 1000000000;
	if(isNaN(duration)) {
		duration = 0;
	}
	return duration;
}