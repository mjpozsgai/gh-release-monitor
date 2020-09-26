import { Octokit } from "@octokit/core";
import React from 'react';
import './App.css';
import './Results.css';
import './Search.css';
import Search from "./Search";
import Results from "./Results";

const octokit = new Octokit();

//main class containing all lifted state
class App extends React.Component {

    constructor(props) {
        super(props);
        //pull tracked repos from local storage and parse string to JSON
        var repos = JSON.parse(window.localStorage.getItem("repos"));
        if (repos === null){
            repos = [];
        }

        this.state = {
            repos: repos,
            search_results: [],
            details: "",
        };
     }

    //show release notes for selected repo
    showDetails(item){
        console.log(item)
        this.setState({
            details: {
                "description": item.description,
                "name": item.name,
                "details_date": item.release_date,
                "details_notes": item.details_notes,
            },
            search_results: []
        })

        //repo has been viewed, remove new flag if it exists
        item.new=false;
        window.localStorage.setItem("repos", JSON.stringify(this.state.repos));
        this.setState({ state: this.state });

    }

    //check releases on "refresh" to see if newer version is available
    checkRelease(item) {
        octokit.request('GET /repos/{owner}/{repo}/releases', {
            owner: item.owner,
            repo: item.name.split("/")[1]
        }).then(
            (response) => {
                console.log(response)
                var new_tag = response["data"][0]["tag_name"];
                if (new_tag !== item.release_tag){
                    item.release_tag = new_tag;
                    item.new = true;
                }
                window.localStorage.setItem("repos", JSON.stringify(this.state.repos));
                this.setState({ state: this.state });
            }).then()
            .catch((error) => {
                console.error(error);
            });
    }

    //initiate release check for all tracked repos
    refresh() {
         this.state.repos.forEach(item => this.checkRelease(item));
    }

    //search for all repos with the query value in repo name
    search(){
        const repo = document.getElementsByClassName("Search-input")[0].value;
        const query = repo.concat("+in:name")
        octokit.request('GET /search/repositories', {
            q: query
        }).then(
            (response) => {
                //display all search results so user can select desired repo
                this.setState({
                    search_results: response["data"]["items"]
                })
            });
    }

    //add selected repo to list of tracked repos
    add(item){
        var repo = item.full_name.split("/")[1]
        var owner = item.full_name.split("/")[0]
        Object.values(this.state.repos).forEach(function (key) {
            if (key.owner === owner && key.name.split("/")[1] === repo){
                window.alert("This repo is already being tracked!");
                repo = null;
            }
        });

        if (repo!== null){
            var description = item.description;
            //get release specific info
            octokit.request('GET /repos/{owner}/{repo}/releases', {
                owner: owner,
                repo: repo
            }).then(
                (response) => {
                    console.log(response)
                    var body = response["data"][0]["body"];
                    var tag = response["data"][0]["tag_name"];
                    var published_at = response["data"][0]["published_at"];
                    this.setState({
                        current_repo: {
                            "name": item.full_name,
                            "owner": owner,
                            "release_date": published_at.split("T")[0],
                            "release_tag": tag,
                            "new": false,
                            "details_notes": body,
                            "description": description
                        }
                    })

                    //display details for selected repo
                    this.showDetails(this.state.current_repo);

                    this.state.repos.push(this.state.current_repo);
                    window.localStorage.setItem("repos", JSON.stringify(this.state.repos));
                    this.setState({ state: this.state });

                }).then()
                    .catch((error) => {
                        alert("No releases exist for this repository!")
                        console.error(error);
                    });
        }else{
            ; //repo already exists
        }

    }

    render () {
        return (
            <div className="App">
                <div className="App-header"> <h1>Welcome! Search for repositories and click to start tracking them!</h1></div>
                <Search search = {this.search.bind(this)} repos ={this.state.repos} refresh ={this.refresh.bind(this)} add={this.add.bind(this)}/>
                <Results showDetails ={this.showDetails.bind(this)} details ={this.state.details} search_results ={this.state.search_results} repos ={this.state.repos} add={this.add.bind(this)}/>
            </div>
        )
    }
}

export default App;
