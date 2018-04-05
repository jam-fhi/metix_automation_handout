import React from 'react';
import ReportStep from './ReportStep';

class ReportScenario extends React.Component {

    constructor(props) {
        super(props);
        this.state = {scenarioData: props.scenarioData, uri: props.uri};
        // Note tags and elements are arrays.
    }

    render() {
        const { scenarioData } = this.state;
        const ReportStepView = scenarioData.steps.map((step) => {
        	const viewKey = this.state.scenarioData.id + step.line;
            return <ReportStep key={viewKey} stepData={step} uri={this.state.uri} />;
        });    	    	
        return (
            <div className="container">
                <div>
                	<span>{this.state.scenarioData.keyword} {this.state.scenarioData.name}</span>
                </div>             
                <div>
                	<span>ID: {this.state.scenarioData.id}</span>
                </div>
                <div>
                	<span>ID: {this.state.scenarioData.type}</span>
                </div>                
                <div>
                	<span>Source: {this.state.uri} @ line {this.state.scenarioData.line}</span>
                </div>                
                <div>
                	<span>Tags: {this.state.scenarioData.tags}</span>
                </div>     
                <div>
                	{ReportStepView}
                </div>       
            </div>
        );
    }
}

export default ReportScenario;
