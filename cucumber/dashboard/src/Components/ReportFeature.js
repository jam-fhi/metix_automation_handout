import React from 'react';
import ReportScenario from './ReportScenario';
import { getDuration } from '../supportMethods';
import ToggleDisplay from 'react-toggle-display';

class ReportFeature extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reportData: props.reportData, showFeature: false, prefix: "+"};
    }

    toggleShowFeature() {
    	if(this.state.showFeature === false) {
    		this.setState({showFeature: true, prefix: "-"});
    	} else {
    		this.setState({showFeature: false, prefix: "+"});
    	}
    }
    render() {
    	let styleClass = "card border-success mb-3";
    	let statusBadge = 'badge badge-success';
    	let resultSummary = this.state.reportData.stats.passed + ' of ' + this.state.reportData.stats.total;
    	if(this.state.reportData.stats.status === "failed") {
			styleClass = "card border-danger mb-3";
			statusBadge = 'badge badge-danger';
			resultSummary = this.state.reportData.stats.failed + ' of ' + this.state.reportData.stats.total;			
		}
		const duration = getDuration(this.state.reportData.stats.duration);
        const { reportData } = this.state;
        let scenarioCount = 0;
        const ReportScenarioView = reportData.elements.map((elements) => {
        	let reactKey = elements.id + scenarioCount;
        	scenarioCount++;
            return <ReportScenario key={reactKey} scenarioData={elements} uri={this.state.reportData.uri} />;
        });    	
        return (
            <div className={styleClass} >
                <div className="card-header" onClick={this.toggleShowFeature.bind(this)}>
                	<span> {this.state.prefix} <span className={statusBadge}>{resultSummary} {this.state.reportData.stats.status} in {duration}s</span> {this.state.reportData.keyword}: {this.state.reportData.name}</span>
                </div>
                <ToggleDisplay if={this.state.showFeature === true}>
	                <div className="card-body">
		                <div className="card border-primary mb-3">
		                	<div className="card-header">
		                		Source: {this.state.reportData.uri} @ line {this.state.reportData.line}
		                	</div>
		                </div>
	                	{ReportScenarioView}   
	                </div>    
	           </ToggleDisplay>
            </div>
        );
    }
}

export default ReportFeature;
