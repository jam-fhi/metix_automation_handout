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
    	
    }

    toggleResultDisplay() {
    	if(this.state.showResult === false) {
    		this.setState({showResult: true, prefix: '-'});
    	} else {
    		this.setState({showResult: false, prefix: '+'});
    	}
    }

    calculateDuration() {

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
            <div className={styleClass} onClick={this.toggleResultDisplay.bind(this)} >
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
