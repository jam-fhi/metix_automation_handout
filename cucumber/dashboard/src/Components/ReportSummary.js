import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import ReportFeature from './ReportFeature';
import { getReportFile } from '../ReportActions';
import ReportStore from '../ReportStore';
import ErrorReport from './ErrorReport';

class ReportSummary extends React.Component {

	constructor(props) {
		super(props);
		this.state = {browser: props.browser, timestamp: props.timestamp, filename: props.filename, showReport: false, reportLoaded: false, reportData: [], error: true, errorMsg: "Not loaded."};
	}

	toggleReportDisplay() {
		if(this.state.showReport === false) {
			this.setState({showReport: true});
			if(this.state.reportLoaded === false) {
				getReportFile(this.state.filename);
			}
		} else {
			this.setState({showReport: false});
		}
	}

    componentDidMount() {
        ReportStore.on("REPORT_FILE" + this.state.filename, this.handleReportFile.bind(this) );
    }

    componentWillUnmount() {
        ReportStore.removeListener('REPORT_FILE' + this.state.filename, this.handleReportFile.bind(this));
    }

    handleReportFile(payload) {
    	if(payload.success === true) {
	        this.setState({reportData: payload.data, error: false, errorMsg: "", reportLoaded: true});
	    } else {
	    	this.setState({reportData: [], error: true, errorMsg: payload.data, reportLoaded: false});
	    }
    }

    render() {
    	const testTimeStamp = new Date;
    	testTimeStamp.setTime(this.state.timestamp);
    	const testDateString = testTimeStamp.toDateString() + ' ' + testTimeStamp.toTimeString();
        const { reportData } = this.state;
        const ReportFeatureView = reportData.map((report) => {
            return <ReportFeature key={report.id} reportData={report} />;
        });    	
        return (
            <div className="container">
            	<div onClick={this.toggleReportDisplay.bind(this)}>
	                <div>
	                	<span>Browser: {this.state.browser}</span>
	                </div>
	                <div>
	                	<span>TimeStamp: {testDateString}</span>
	                </div>
                </div>           
                <ToggleDisplay if={this.state.showReport === true}>
               		<ToggleDisplay if={this.state.reportLoaded === true}>
                		<ToggleDisplay if={this.state.error === true}>
                			<ErrorReport error={this.state.errorMsg} />
                		</ToggleDisplay>
                		<ToggleDisplay if={this.state.error === false}>
                			{ReportFeatureView}
                		</ToggleDisplay>                		
                	</ToggleDisplay>     
                </ToggleDisplay>
            </div>
        );
    }
}

export default ReportSummary;
