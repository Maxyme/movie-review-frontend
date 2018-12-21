import React, {Component} from 'react';

import './App.css';

const API = 'http://127.0.0.1:5000';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            counts: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({url: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault(); // prevent refresh after form send

        fetch(API + '/getcounts', {
            method: 'post',
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "omit", // include, *same-origin, omit
            redirect: 'follow',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
                body: JSON.stringify({"url": this.state.url})
            })
            .then(response => response.json())
            .then(data => this.setState({counts: data}),
            );
    }

    render() {

        const counts = this.state.counts
        const listItems = counts.map((key) =>
        <li key={key.name}>
            {key.name}: {key.count}
        </li>
        );

        return (
            <div className="App">
                <header className="App-header">
                    <p>Ent Count</p>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder="Enter URL..." value={this.state.url} onChange={this.handleInputChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                {listItems
                    ? (
                        <div>
                            <h1>Ents</h1>
                            <p>{listItems}</p>
                        </div>
                    )
                    : (
                        <div>
                            <p>Please enter an url above</p>
                        </div>
                    )}

            </div>
        );
    }
}

export default App;
