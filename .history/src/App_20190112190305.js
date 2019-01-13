import React, {Component} from 'react';

import axios from 'axios';

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

    handleImageChange(event) {
        event.preventDefault();
    
        let reader = new FileReader();
        let file = event.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }


    render() {
        const counts = this.state.counts
        const listItems = counts.map((key) =>
        <li key={key.name}>
            {key.name}: {key.count}
        </li>
        );

        let imagePreviewUrl = this.state.imagePreviewUrl;
        let imagePreview = null;
        if (imagePreviewUrl) {
          imagePreview = (<RotateImage src={imagePreviewUrl} />);
        } else {
          imagePreview = (<div className="previewText"></div>);
        }

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

                    <div className="previewComponent">
                    <input className="fileInput" type="file" onChange={(e)=>this.handleImageChange(e)} />
                    {imagePreviewUrl ? 
                    (
                    <div className="imgPreview">
                        <RotateImage src={imagePreviewUrl} />
                    </div>
                    )
                    :
                    (
                        <div className="previewText"></div>
                    )}
                    </div>
            </div>
        );
    }
}

class RotateImage extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        rotation: 0
      }
      this.rotate = this.rotate.bind(this);
    }
    
    rotate(event){
        let side = event.target.value;
        let diff = side === "right" ? 90 : -90;
        let rotation = this.state.rotation + diff;
        this.setState({rotation: rotation})
    }
    

    render(){
      return (                   
        <div>
            <input onClick={this.rotate} type="button" value="left" />
            <img style={{transform: `rotate(${this.state.rotation}deg)`}} src={this.props.src} width="400" alt=""/>
            <input onClick={this.rotate} type="button" value="right" />
        </div>
      )
    }
  };



export default App;
