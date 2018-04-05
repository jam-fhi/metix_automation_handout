import React from 'react';
import ReportScenario from './ReportScenario';

class ReportFeature extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reportData: props.reportData};
        // Note tags and elements are arrays.
    }

    render() {
        const { reportData } = this.state;
        const ReportScenarioView = reportData.elements.map((elements) => {
            return <ReportScenario key={elements.id} scenarioData={elements} uri={this.state.reportData.uri} />;
        });    	
        return (
            <div className="container">
                <div>
                	<span>{this.state.reportData.keyword} {this.state.reportData.name}</span>
                </div>             
                <div>
                	<span>ID: {this.state.reportData.id}</span>
                </div>
                <div>
                	<span>Source: {this.state.reportData.uri} @ line {this.state.reportData.line}</span>
                </div>                
                <div>
                	<span>Tags: {this.state.reportData.tags}</span>
                </div>
                <div>
                	{ReportScenarioView}
                </div>       
            </div>
        );
    }
}

export default ReportFeature;
