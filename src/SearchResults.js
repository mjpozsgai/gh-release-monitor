import React from 'react';

//class to display search results UI
class SearchResults extends React.Component{
    render () {
        const arr =[];
        const results = this.props.search_results;
        Object.values(results).forEach(function (key) {
            arr.push(key);
        });
        return (
            <div className="Search-results">
                {arr.map(item =>
                    <div onClick={() => this.props.add(item)} key={item.full_name} id="search-list-repo">
                        <div  id="repo-name">{item.full_name}</div>
                        <div id = "repo-description">{item.description}</div>
                    </div>
                )}
            </div>
        )
    }
}

export default SearchResults;