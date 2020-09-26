import React from 'react';

//class to display tracked repos
class ResultList extends React.Component {
    render () {
        const arr =[];
        const repos = this.props.repos;
        Object.values(repos).forEach(function (key) {
            arr.push(key);
        });
        return (
            <div className="Results-list">
                {arr.map(item =>
                    <div onClick={() => this.props.showDetails(item)}  key={item.name} id="list_item">

                        <div>
                            <div id="repo-info">
                                <div id="repo-name">{item.name}</div>
                                <div id="release-tag">{item.release_tag} </div>
                            </div>
                            <div id="release-date">Date Published: {item.release_date} </div>
                            <div id="new"> {item.new &&
                            <div id = "new-alert">New! </div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default ResultList;
