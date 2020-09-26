import React from 'react';

//class containing search UI
class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            repos: this.props.repos
        };
    }
    render () {
        return (
            <div className="Search">
                <div className="Search-body">
                    <button onClick={this.props.refresh} className="refresh-button">Refresh</button>
                    <div className="search-container">
                        <input className="Search-input" placeholder="Enter repository name or owner/name"></input>
                        <button onClick={this.props.search} className="Search-button">Search</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;