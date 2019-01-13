import React, {Component} from 'react';

import axios from 'axios';
import Dropzone from 'react-dropzone'

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            counts: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    
    handleInputChange(event) {
        this.setState({url: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault(); // prevent refresh after form send
        axios.post(process.env.REACT_APP_API_URL + '/getcounts', {"url": this.state.url})
        .then((response) => this.setState({counts: response.data}))
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
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
                    <h1>Ent Count</h1>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <label className="label">
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
                    <Dropzone
                    onDrop={this.onImageDrop.bind(this)}
                    accept="image/*"
                    multiple={false}>
                        {({getRootProps, getInputProps}) => {
                        return (
                            <div
                            {...getRootProps()}
                            >
                            <input {...getInputProps()} />
                            {
                            <p>Try dropping some files here, or click to select files to upload.</p>
                            }
                            </div>
                        )
                    }}
                    </Dropzone>
            </div>
        );
    }
}

export default App;
