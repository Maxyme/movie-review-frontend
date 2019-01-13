import React, {Component} from 'react';

import axios from 'axios';

import './App.css';

import Typography from 'typography'
import lincolnTheme from 'typography-theme-lincoln'



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
        axios.post(process.env.REACT_APP_API_URL + '/getcounts', {"url": this.state.url})
        .then((response) => this.setState({counts: response.data}))
    }

    render() {
        const typography = new Typography(lincolnTheme)

        // Output CSS as string.
        typography.toString()
        
        // Or insert styles directly into the <head> (works well for client-only
        // JS web apps.
        typography.injectStyles()
        console.log(process.env.REACT_APP_API_URL)
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
