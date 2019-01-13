import React, {Component} from 'react';

import axios from 'axios';
import Dropzone from 'react-dropzone'

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            counts: [],
            rotation: 0
            // file: '',
            // imagePreviewUrl: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.rotate = this.rotate.bind(this);
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

    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }

    rotate(event){
        let side = event.target.value;
        let rotation = 0

        if(side === "right"){
            rotation = this.state.rotation + 90;}
        else{
            rotation = this.state.rotation - 90;
        }
        
        if(rotation >= 360){
            rotation =- 360;
        }
        this.setState({rotation: rotation})
      }

    render() {
        const counts = this.state.counts
        const listItems = counts.map((key) =>
        <li key={key.name}>
            {key.name}: {key.count}
        </li>
        );

        const { rotation } =  this.state;

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
                    <Dropzone onDrop={this.onDrop.bind(this)} accept="image/*" multiple={false}>
                        {({getRootProps, getInputProps}) => {
                        return (
                            <div
                            {...getRootProps()}
                            >
                            <input {...getInputProps()} />
                            {
                            <p>Drop an image or pdf document here to begin.</p>
                            }
                            </div>
                        )
                    }}
                    </Dropzone>
                    <ImageUpload />
                    <div>
                        <input onClick={this.rotate} type="button" value="left" />
                        <img style={{transform: `rotate(${rotation}deg)`}} src={this.props.src} width="400" />
                        <input onClick={this.rotate} type="button" value="right" />
                    </div>
            </div>
        );
    }
}

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '', imagePreviewUrl: ''};
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText"></div>);
      }
  
      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
          </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>
      )
    }
  }

export default App;


// class RotateIMG extends React.Component{
//     constructor(props){
//       super(props);
//       this.state = {
//         rotation: 0
//       }
      
//       this.rotate = this.rotate.bind(this);
//       this.rotateleft = this.rotateleft.bind(this);
//     }
    
//     rotate(){
//       let newRotation = this.state.rotation + 90;
//       if(newRotation >= 360){
//         newRotation =- 360;
//       }
//       this.setState({
//         rotation: newRotation,
//       })
//     }
    
//     rotateleft(){
//       let newRotation = this.state.rotation - 90;
//       if(newRotation >= 360){
//         newRotation =- 360;
//       }
//       this.setState({
//         rotation: newRotation,
//       })
//     }
    
//     render(){
//       const { rotation } =  this.state;
//       return <div><input onClick={this.rotateleft} type="button" value="left" />
//         <img style={{transform: `rotate(${rotation}deg)`}} src={this.props.src} width="400" /><input onClick={this.rotate} type="button" value="right" />
        
//       </div>
//     }
//   };
  
//   class ImageUpload extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {file: '',imagePreviewUrl: ''};
//     }
  
//     _handleImageChange(e) {
//       e.preventDefault();
  
//       let reader = new FileReader();
//       let file = e.target.files[0];
  
//       reader.onloadend = () => {
//         this.setState({
//           file: file,
//           imagePreviewUrl: reader.result
//         });
//       }
  
//       reader.readAsDataURL(file)
//     }
  
//     render() {
//       let {imagePreviewUrl} = this.state;
//       let $imagePreview = null;
//       if (imagePreviewUrl) {
//         $imagePreview = (<RotateIMG src={imagePreviewUrl} />);
//       } else {
//         $imagePreview = (<div className="previewText"></div>);
//       }
  
//       return (
//         <div className="previewComponent">
//           <form onSubmit={(e)=>this._handleSubmit(e)}>
//             <input className="fileInput" 
//               type="file" 
//               onChange={(e)=>this._handleImageChange(e)} />
//           </form>
//           <div className="imgPreview">
//             {$imagePreview}
//           </div>
//         </div>
//       )
//     }
//   }
    
//   ReactDOM.render(<ImageUpload />, document.getElementById("mainApp"));