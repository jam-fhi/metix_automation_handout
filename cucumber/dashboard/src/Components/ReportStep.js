import React from 'react';
import ToggleDisplay from 'react-toggle-display';

class ReportStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {stepData: props.stepData, uri: props.uri, duration: 0, result: 'pending', showResult: false, prefix: "+"};
        // Note tags and elements are arrays.
    }

    componentWillMount() {
    	this.calculateDuration();
    	this.setState({result: this.state.stepData.result.status});
    	this.props.setResult(this.state.stepData.result.status);
    }

    toggleResultDisplay() {
    	if(this.state.showResult === false) {
    		this.setState({showResult: true, prefix: '-'});
    	} else {
    		this.setState({showResult: false, prefix: '+'});
    	}
    }

    calculateDuration() {

		// Not found documentation on what unit is being used for duration.
		// This makes sense in terms of my own experience running tests, and seems
		// to be a sensible number of seconds for test duration. I'll double check
		// this at the end. There should be a documentation reference to explain.
		// From another test result, using this calculation then Duration: 5.008
		// Error Message: Error: function timed out, ensure the promise resolves 
		// within 5000 milliseconds
		if('duration' in this.state.stepData.result) {
			const duration = this.state.stepData.result.duration / 1000000000;
			this.setState({duration: duration});
		}
    }

    render() {

    	let styleClass = "card text-white bg-warning mb-3";
    	if(this.state.result === "passed") {
			styleClass = "card text-white bg-success mb-3";
		} else if(this.state.result === "failed") {
			styleClass = "card text-white bg-danger mb-3";
		}

		const source = this.state.uri + ' @ line ' + this.state.stepData.line;

        return (
            <div className={styleClass} style={{"maxWidth": "30rem"}} onClick={this.toggleResultDisplay.bind(this)} >
                <div className="card-header">
                	<span>{this.state.prefix} {this.state.stepData.keyword} {this.state.stepData.name} ({this.state.result}, {this.state.duration}s)</span>
                </div>
                <ToggleDisplay if={this.state.showResult === true}>
		            <div className="card-body">
		                <div>
		                	<span>Status: {this.state.result}</span>
		                </div>             
		                <div>
		                	<span>Duration: {this.state.duration}</span>
		                </div>
		                <div>
		                	<span>Source: {source}</span>
		                </div>                
		                <ToggleDisplay if={this.state.stepData.result.error_message !== null}>
		                	<span>{this.state.stepData.result.error_message}</span>
		                </ToggleDisplay>
		            </div>
                </ToggleDisplay>
            </div>
        );
    }
}

export default ReportStep;
