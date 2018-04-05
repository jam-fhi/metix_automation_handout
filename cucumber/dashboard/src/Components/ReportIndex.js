import React from 'react';
import ReportSummary from './ReportSummary'

class ReportIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reportIndex:props.reportIndex};
    }

    render() {
        const { reportIndex } = this.state;
        const ReportSummaryView = reportIndex.map((report) => {
            return <ReportSummary key={report.filename} filename={report.filename} browser={report.browser} timestamp={report.timestamp} />;
        });

        return (
            <div className="container">
                <div>
                    <span>Test Reports: {this.state.reportIndex.length}</span>
                </div>
                <div>
                    {ReportSummaryView}
                </div>
            </div>
        );
    }
}

export default ReportIndex;
