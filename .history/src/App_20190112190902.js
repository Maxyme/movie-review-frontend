import React, {Component} from 'react';

import axios from 'axios';
import RotateImage from "./RotateImage"
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            counts: [],
            file: '',
            imagePreviewUrl: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({url: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault(); // prevent refresh after form send
        axios
            .post(process.env.REACT_APP_API_URL + '/getcounts', {"url": this.state.url})
            .then((response) => this.setState({counts: response.data}))
    }

    handleImageChange(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onload = () => {
            this.setState({file: file, imagePreviewUrl: reader.result});
        }

        reader.readAsDataURL(file)
    }

    render() {
        const counts = this.state.counts
        const listItems = counts.map((key) => <li key={key.name}>
            {key.name}: {key.count}
        </li>);

        const imagePreviewUrl = this.state.imagePreviewUrl;

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Ent Count</h1>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <label className="label">
                        <input
                            type="text"
                            placeholder="Enter URL..."
                            value={this.state.url}
                            onChange={this.handleInputChange}/>
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

                <div className="previewImage">
                    <input
                        className="fileInput"
                        type="file"
                        onChange={this.handleImageChange}/> {imagePreviewUrl
                        ? (
                            <div className="imgPreview">
                                <RotateImage src={imagePreviewUrl}/>
                            </div>
                        )
                        : (
                            <div className="previewText"></div>
                        )}
                </div>
            </div>
        );
    }
}

export default App;
