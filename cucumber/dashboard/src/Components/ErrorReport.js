import React from 'react';

class ErrorReport extends React.Component {

	constructor(props) {
		super(props);
		this.state = {error: props.error};
	}

    render() {
        return (
            <div className="card border-danger mb-3">
            	<div className="card-header">
            		Error
            	</div>
            	<div className="card-body">
            		{this.props.error}
            	</div>
            </div>
        );
    }
}

export default ErrorReport;
