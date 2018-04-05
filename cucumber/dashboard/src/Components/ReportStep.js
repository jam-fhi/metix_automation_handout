import React from 'react';
import ReportStepResult from './ReportStepResult';
import ReportStepArguement  from './ReportStepArguement';

class ReportStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {stepData: props.stepData, uri: props.uri};
        // Note tags and elements are arrays.
    }

    render() {
        return (
            <div className="container">
                <div>
                	<span>{this.state.stepData.keyword} {this.state.stepData.name}</span>
                </div>             
                <div>
                	<ReportStepArguement argData={this.state.stepData.arguements} />
                </div>
                <div>
                	<span>Match: {this.state.stepData.match.location}</span>
                </div>                
                <div>
                	<span>Source: {this.state.uri} @ line {this.state.stepData.line}</span>
                </div>
                <div>
                	<ReportStepResult resultData={this.state.stepData.result} />
                </div>
            </div>
        );
    }
}

export default ReportStep;
