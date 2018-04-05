import React from 'react';
import ReportSummary from './ReportSummary';
import ToggleDisplay from 'react-toggle-display';

class ReportIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reportIndex:props.reportIndex, showReports: false, prefix: "+"};
    }

    toggleReportsShow() {
        if(this.state.showReports === false) {
            this.setState({showReports: true, prefix: "-"});
        } else {
            this.setState({showReports: false, prefix: "+"});
        }
    }

    render() {
        const { reportIndex } = this.state;
        const ReportSummaryView = reportIndex.map((report) => {
            /*  */
            console.log(report);
            return <ReportSummary key={report.filename} filename={report.filename} browser={report.browser} timestamp={report.timestamp} duration={report.duration} status={report.status} />;
        });

        return (
            <div className="card border-primary mb-3">
                <div className="card-header" onClick={this.toggleReportsShow.bind(this)}>
                    <span>{this.state.prefix} {this.state.reportIndex.length} Test Reports</span>
                </div>
                <ToggleDisplay if={this.state.showReports === true}>
                    <div className="card-body">
                        {ReportSummaryView}
                    </div>
                </ToggleDisplay>
            </div>
        );
    }
}

export default ReportIndex;
