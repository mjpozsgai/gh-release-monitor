import React from 'react';

//class to display repo details
class ResultDetails extends React.Component{
    render () {
        return (
            <div className="Search-results">
                {this.props.details.name!=null &&
                <div>
                    <div id="Name">{this.props.details.name}</div>
                    <div id="Description">{this.props.details.description}</div>
                    <div id="Date">{this.props.details.details_date} </div>
                    <br/>
                    <div id="Notes">{this.props.details.details_notes} </div>
                </div>}

            </div>
        )
    }
}

export default ResultDetails;