import React from 'react';

class ReportStepResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {resultData: props.resultData};
        // Note tags and elements are arrays.
    }

    render() {
        return (
            <div className="container">
                <div>
                	<span>Status: {this.state.resultData.status}</span>
                </div>             
                <div>
                	<span>Duration: {this.state.resultData.duration}</span>
                </div>
                <div>
                	<span>Error Message: {this.state.resultData.error_message}</span>
                </div>
            </div>
        );
    }
}

export default ReportStepResult;
