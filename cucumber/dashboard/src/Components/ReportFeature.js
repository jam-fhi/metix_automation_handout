import React from 'react';
import ReportScenario from './ReportScenario';

class ReportFeature extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reportData: props.reportData, result: 'passed', duration: 0};
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

        const { reportData } = this.state;
        let scenarioCount = 0;
        const ReportScenarioView = reportData.elements.map((elements) => {
        	let reactKey = elements.id + scenarioCount;
        	scenarioCount++;
            return <ReportScenario key={reactKey} scenarioData={elements} setResult={this.setResult.bind(this)} uri={this.state.reportData.uri} />;
        });    	
        return (
            <div className={styleClass} >
                <div className="card-header">
                	<span>{this.state.reportData.keyword} {this.state.reportData.name} ({this.state.result}, {this.state.duration}s)</span>
                </div>
                <div className="card-body">
	                <div className="card border-primary mb-3">
	                	<div className="card-header">
	                		Source: {this.state.reportData.uri} @ line {this.state.reportData.line}
	                	</div>
	                </div>
                	{ReportScenarioView}   
                </div>    
            </div>
        );
    }
}

export default ReportFeature;
