import React from 'react';

class ErrorReport extends React.Component {

	constructor(props) {
		super(props);
		this.state = {error: props.error};
	}

    render() {
        return (
            <div className="container">
                	<span>{this.props.error}</span>
            </div>
        );
    }
}

export default ErrorReport;
