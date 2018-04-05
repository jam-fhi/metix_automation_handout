import React from 'react';

class ReportStepArguement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {argData: props.argData};
        // Note tags and elements are arrays.
    }

    render() {
        const { argData } = this.state;
        let ReportStepArgView = 'No Arguements';
        let argCount = 0;
        if(typeof(argData) !== 'undefined') {
	        ReportStepArgView = argData.map((arg) => {
    	    	argCount++;
        	    return <span>#{argCount} {arg}</span>;
        	});
        }
        return (
            <div className="container">
                <div>
                	<span>Arguements</span>
                </div>             
                <div>
                	{ReportStepArgView}
                </div>
            </div>
        );
    }
}

export default ReportStepArguement;
