import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import { getDuration } from '../supportMethods';

class ReportStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {stepData: props.stepData, uri: props.uri, showResult: false, prefix: "+"};
    }

    toggleResultDisplay() {
    	if(this.state.showResult === false) {
    		this.setState({showResult: true, prefix: '-'});
    	} else {
    		this.setState({showResult: false, prefix: '+'});
    	}
    }

    render() {
    	let duration = 0;
    	if('duration' in this.state.stepData.result) {
	    	duration = getDuration(this.state.stepData.result.duration);
	    }
    	let styleClass = "card text-white bg-warning mb-3";
    	if(this.state.stepData.result.status === "passed") {
			styleClass = "card text-white bg-success mb-3";
		} else if(this.state.stepData.result.status === "failed") {
			styleClass = "card text-white bg-danger mb-3";
		}

		const source = this.state.uri + ' @ line ' + this.state.stepData.line;

        return (
            <div className={styleClass} onClick={this.toggleResultDisplay.bind(this)} >
                <div className="card-header">
                	<span>{this.state.prefix} {this.state.stepData.keyword} {this.state.stepData.name} ({this.state.stepData.result.status}, {duration}s)</span>
                </div>
                <ToggleDisplay if={this.state.showResult === true}>
		            <div className="card-body">
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
