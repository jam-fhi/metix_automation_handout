import React from 'react';

class ReportSummary extends React.Component {

	constructor(props) {
		super(props);
		this.state = {browser: props.browser, timestamp: props.timestamp};
	}

    render() {
    	const testTimeStamp = new Date;
    	testTimeStamp.setTime(this.state.timestamp);
    	const testDateString = testTimeStamp.toDateString() + ' ' + testTimeStamp.toTimeString();
        return (
            <div className="container">
                <div>
                	<span>Browser: {this.state.browser}</span>
                </div>
                <div>
                	<span>TimeStamp: {testDateString}</span>
                </div>
            </div>
        );
    }
}

export default ReportSummary;
