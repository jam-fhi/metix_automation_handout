export function getDuration(durationLong) {
	let duration = durationLong / 1000000000;
	if(isNaN(duration)) {
		duration = 0;
	}
	return duration;
}