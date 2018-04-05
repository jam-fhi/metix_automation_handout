import React from 'react';
import ReportStep from './ReportStep';

class ReportScenario extends React.Component {

    constructor(props) {
        super(props);
        this.state = {scenarioData: props.scenarioData, uri: props.uri, duration: 0, result: "passed"};
        // Note tags and elements are arrays.
    }

    componentDidMount() {
    	this.setDuration();
    }

    setDuration() {
    	// Not the most elegant solution.
    	// Originally I wanted to use props, in the way setResult does.
    	// Problem with async calls, as it incremented 0 each time rather
    	// than waiting for the state to be set, then increment.
    	const { scenarioData } = this.state;
    	let totalDuration = 0;
    	scenarioData.steps.forEach((step) => {
    		if('duration' in step.result) {
	    		totalDuration += step.result.duration;
	    	}
    	});
    	let durationSeconds = totalDuration / 1000000000;
    	if(isNaN(durationSeconds)) {
    		durationSeconds = 0;
    	}
    	this.setState({duration: durationSeconds});
    }

    setResult(result) {
    	if(result !== 'passed') {
    		this.setState({result: 'failed'});
    	}
    }

    render() {

    	let styleClass = "card border-success mb-3";
    	if(this.state.result === "failed") {
			styleClass = "card border-danger mb-3";
		}
        const { scenarioData } = this.state;
        let stepCount = 0;
        const ReportStepView = scenarioData.steps.map((step) => {
        	const viewKey = this.state.scenarioData.id + step.line + stepCount;
        	stepCount++;
            return <ReportStep key={viewKey} stepData={step} uri={this.state.uri} setResult={this.setResult.bind(this)} />;
        });    	    	
        return (
            <div className={styleClass} >
                <div className="card-header">
                	<span>{this.state.scenarioData.keyword} {this.state.scenarioData.name} ({this.state.result}, {this.state.duration}s)</span>
                </div>
                <div className="card-body">     
	                <div className="card border-primary mb-3">
	                	<div className="card-header">
	                		Source: {this.state.uri} @ line {this.state.scenarioData.line}
	                	</div>
	                </div>
	                {ReportStepView}
                </div>
            </div>
        );
    }
}

export default ReportScenario;
