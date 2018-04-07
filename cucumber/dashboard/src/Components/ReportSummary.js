import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import ReportFeature from './ReportFeature';
import { getReportFile } from '../ReportActions';
import ReportStore from '../ReportStore';
import ErrorReport from './ErrorReport';
import { getDuration } from '../supportMethods';

class ReportSummary extends React.Component {

	constructor(props) {
		super(props);
		this.state = {browser: props.browser, timestamp: props.timestamp, filename: props.filename, showReport: false, reportLoaded: false, reportData: [], error: true, errorMsg: "Not loaded.", duration: props.duration, status: props.status};
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
    	let styleClass = "card border-success mb-3";
    	if(this.state.status === "failed") {
			styleClass = "card border-danger mb-3";
		}
		const duration = getDuration(this.state.duration);
    	const testTimeStamp = new Date;
    	testTimeStamp.setTime(this.state.timestamp);
    	const minutes = testTimeStamp.getMinutes() < 10 ? '0' + testTimeStamp.getMinutes() : testTimeStamp.getMinutes();
    	const testDateString = testTimeStamp.getDate() + '/' + (testTimeStamp.getMonth() + 1) + '/' + testTimeStamp.getFullYear() + ' ' + testTimeStamp.getHours() + ':' + minutes;
        const { reportData } = this.state;
        const ReportFeatureView = reportData.map((report) => {
            return <ReportFeature key={report.id} reportData={report} />;
        });    	
        return (
            <div className={styleClass}>
            	<div className="card-header cardTitleBar" onClick={this.toggleReportDisplay.bind(this)}>
            		<ToggleDisplay if={this.state.browser === 'firefox'}>
            			<img src="firefox.png" className="cardImg" style={{"width":"64px","height":"64px"}} />
            		</ToggleDisplay>
            		<ToggleDisplay if={this.state.browser !== 'firefox'}>
            			<img src="chrome.png" className="cardImg" style={{"width":"64px","height":"64px"}} />
            		</ToggleDisplay>
            		<div className="cardTitleSmall">
		                {testDateString} ({this.state.status}, {duration}s)
		            </div>
                </div>    
                <ToggleDisplay if={this.state.showReport === true}>
               		<ToggleDisplay if={this.state.reportLoaded === true}>
                		<ToggleDisplay if={this.state.error === true}>
                			<div className="card-body">
                				<ErrorReport error={this.state.errorMsg} />
                			</div>
                		</ToggleDisplay>
                		<ToggleDisplay if={this.state.error === false}>
                			<div className="card-body">	
                				{ReportFeatureView}
                			</div>
                		</ToggleDisplay>                		
                	</ToggleDisplay>     
                </ToggleDisplay>
            </div>
        );
    }
}

export default ReportSummary;
