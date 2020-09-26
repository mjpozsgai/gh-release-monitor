import React from 'react';
import ResultDetails from "./ResultDetails";
import SearchResults from "./SearchResults";
import ResultList from "./ResultList";


//class containing results UI
class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: this.props.repos
        };
    }
    render () {
        //display search results if present
        if (this.props.search_results.length === 0){
            return (
                <div className="Results">
                    <div className="Results-body">
                        <div className="Results-list-container">
                            <div id="title">
                                <h1>Tracked Repositories</h1>
                                <div id = "sub">Click refresh to check for new releases!</div>
                            </div>
                            <ResultList showDetails={this.props.showDetails} repos={this.props.repos}/>
                        </div>
                        <div className="Results-details-container">
                            <div id="title">
                                <h1>Repository Details</h1>
                                <div id="sub">Select a tracked repository to view details!</div>
                            </div>
                            <div className="Results-details">
                                <ResultDetails  details = {this.props.details} add={this.props.add} search_results = {this.props.search_results}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        //display repo details
        else{
            return (
                <div className="Results">
                    <div className="Results-body">
                        <div className="Results-list-container">
                            <div id="title">
                                <h1>Tracked Repositories</h1>
                                <div id = "sub">Click refresh to check for new releases!</div>
                            </div>
                            <ResultList repos={this.props.repos}/>
                        </div>;
                        <div className="Results-details-container">
                            <div id="title">
                                <h1>Search Results</h1>
                                <div id = "sub">Click repository to start tracking it!</div>
                            </div>
                            <div className="Results-details">
                                <SearchResults  add={this.props.add} search_results = {this.props.search_results}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Results;