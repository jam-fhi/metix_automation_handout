import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import { getReportsIndex, loadReportFile } from './ReportActions';
import ReportStore from './ReportStore';
import ReportIndex from './Components/ReportIndex';
import ErrorReport from './Components/ErrorReport';

import './App.css';

class App extends React.Component {

	constructor() {
		super();
		this.state = {reportIndex: [], indexLoaded: false, errorMsg: "Nothing loded."};
	}

	componentDidMount() {
		ReportStore.on("REPORT_INDEX", this.handleReportIndex.bind(this) );
		getReportsIndex();
	}

    componentWillUnmount() {
        ReportStore.removeListener('REPORT_INDEX', this.handleReportIndex.bind(this));
    }

	handleReportIndex(payload) {
		if(payload.success === true) {
			this.setState({reportIndex:payload.data, indexLoaded: true, errorMsg: ""});
		} else {
			this.setState({reportIndex:[], indexLoaded: false, errorMsg: payload.data});
		}
	}

    render() {
        return (
            <div className="app">
                <h1>Test Reports Dashboard</h1>
                <ToggleDisplay if={this.state.indexLoaded === false}>
                	<ErrorReport error={this.state.errorMsg} />
                </ToggleDisplay>
                <ToggleDisplay if={this.state.indexLoaded === true}>
                	<ReportIndex reportIndex={this.state.reportIndex} />
                </ToggleDisplay>                
            </div>
        );
    }
}

export default App;
