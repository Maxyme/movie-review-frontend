import React, { Component } from "react";

import axios from "axios";
import RotateImage from "./RotateImage";

import { Stage, Layer, Text } from "react-konva";
import shortid from "shortid";
import Rectangle from "./Rectangle";
import TransformerComponent from "./TransformerComponent";
import AnnotationImage from "./AnnotationImage";

import { Image } from "react-konva";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      counts: [],
      file: "",
      imagePreviewUrl: "",
      imageHeight: 800,
      imageWidth: 1000,
      imageSrc: "https://s3-ap-northeast-1.amazonaws.com/uploads-jp.hipchat.com/119782/5591318/0GFMfb0v0xHieft/upload.png",
      rectangles: [],
      rectCount: 0,
      selectedShapeName: "",
      mouseDown: false,
      mouseDraw: false,
      newRectX: 0,
      newRectY: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleUrlSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleStageMouseDown = this.handleStageMouseDown.bind(this);
    this.handleNewRectChange = this.handleNewRectChange.bind(this);
    this.handleRectChange = this.handleRectChange.bind(this);
    this.handleStageMouseUp = this.handleStageMouseUp.bind(this);
  }

  // This is needed for the annotation layer
  componentDidMount() {
    this.img.moveToBottom();
  }

  handleStageMouseDown = event => {
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      event.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // clicked on stage - clear selection or ready to generate new rectangle
    if (event.target.className === "Image") {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.setState({
        mouseDown: true,
        newRectX: mousePos.x,
        newRectY: mousePos.y,
        selectedShapeName: ""
      });
      return;
    }

    // find clicked rect by its name
    const name = event.target.name();
    const rect = this.state.rectangles.find(r => r.name === name);
    if (rect) {
      this.setState({ selectedShapeName: name });
    } else {
      this.setState({ selectedShapeName: "" });
    }
  };

  handleRectChange = (index, newProps) => {
    const rectangles = this.state.rectangles;
    rectangles[index] = {
      ...rectangles[index],
      ...newProps
    };

    this.setState({ rectangles });
  };

  handleNewRectChange = event => {
    const { rectangles, rectCount, newRectX, newRectY } = this.state;
    const stage = event.target.getStage();
    const mousePos = stage.getPointerPosition();
    if (!rectangles[rectCount]) {
      rectangles.push({
        x: newRectX,
        y: newRectY,
        //width: mousePos.x - newRectX,
        //height: 15, //mousePos.y - newRectY,
        name: `rect${rectCount + 1}`,
        stroke: "#00A3AA",
        key: shortid.generate()
      });
      return this.setState({ rectangles, mouseDraw: true });
    }
    rectangles[rectCount].width = mousePos.x - newRectX;
    rectangles[rectCount].height = mousePos.y - newRectY;
    return this.setState({ rectangles });
  };

  handleStageMouseUp = () => {
    if (this.state.mouseDraw) {
      const rectCount = this.state.rectCount;
      this.setState({
        rectCount: rectCount + 1,
        mouseDraw: false
      });
    }
    this.setState({ mouseDown: false });
  };

  handleInputChange(event) {
    this.setState({ url: event.target.value });
  }

  handleUrlSubmit(event) {
    event.preventDefault(); // prevent refresh after form send
    axios
      .post(process.env.REACT_APP_API_URL + "/getcounts", {
        url: this.state.url
      })
      .then(response => this.setState({ counts: response.data }));
  }

  handleImageChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {

      const img = new window.Image();
      img.onload = () => {

        this.setState({ imageHeight: img.height, imageWidth: img.width, file: file, imagePreviewUrl: reader.result, rectangles: []});
      };
      img.src = reader.result;
      // this.setState({ file: file, imagePreviewUrl: reader.result});
    };

    reader.readAsDataURL(file);
  }

  render() {
    const counts = this.state.counts;
    const listItems = counts.map(key => (
      <li key={key.name}>
        {key.name}: {key.count}
      </li>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h1>Ent Count</h1>
        </header>
        <form onSubmit={this.handleUrlSubmit}>
          <label className="label">
            <input
              type="text"
              placeholder="Enter URL..."
              value={this.state.url}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        {listItems ? (
          <div>
            <h1>Ents</h1>
            <p>{listItems}</p>
          </div>
        ) : (
          <div>
            <p>Please enter an url above</p>
          </div>
        )}

        <div className="previewImage">
          <input
            className="fileInput"
            type="file"
            onChange={this.handleImageChange}
          />
          {/* {this.state.imagePreviewUrl ? (
            <div className="imgPreview">
              <RotateImage src={this.state.imagePreviewUrl} width="100"/>
            </div>
          ) : (
            <div className="previewText" />
          )} */}
        </div>
        <div id="app">
          <Stage
            ref={node => {
              this.stage = node;
            }}
            container="app"
            width={this.state.imageWidth}
            height={this.state.imageHeight}
            onMouseDown={this.handleStageMouseDown}
            onTouchStart={this.handleStageMouseDown}
            onMouseMove={this.state.mouseDown && this.handleNewRectChange}
            onTouchMove={this.state.mouseDown && this.handleNewRectChange}
            onMouseUp={this.handleStageMouseUp}
            onTouchEnd={this.handleStageMouseUp}
          >
            <Layer>
              {this.state.rectangles.map((rect, i) => (
                <Rectangle
                  sclassName="rect"
                  strokeWidth={2}
                  key={rect.key}
                  {...rect}
                  onTransform={newProps => {
                    this.handleRectChange(i, newProps);
                  }}
                />
              ))}
              <TransformerComponent
                selectedShapeName={this.state.selectedShapeName}
              />
            </Layer>
            <Layer
              ref={node => {
                this.img = node;
              }}
            >
              <AnnotationImage src={this.state.imagePreviewUrl} width={this.state.imageWidth} height={this.state.imageHeight}/>
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default App;
