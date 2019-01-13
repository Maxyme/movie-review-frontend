import React, {Component} from 'react';

import axios from 'axios';
import RotateImage from "./RotateImage"

import {Stage, Layer} from 'react-konva';
import shortid from 'shortid';
import Rectangle from './Rectangle';
import RectTransformer from './RectangleTransformer';
import AnnotationImage from './AnnotationImage';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            counts: [],
            file: '',
            imagePreviewUrl: '',
            rectangles: [],
            rectCount: 0,
            selectedShapeName: '',
            mouseDown: false,
            mouseDraw: false,
            newRectX: 0,
            newRectY: 0
        };
        this.handleInputChange = this
            .handleInputChange
            .bind(this);
        this.handleSubmit = this
            .handleUrlSubmit
            .bind(this);
        this.handleImageChange = this
            .handleImageChange
            .bind(this);
    }

    componentDidMount() {
        this
            .img
            .moveToBottom();
    }

    handleStageMouseDown = (event) => {
        const {rectangles} = this.state;
        // clicked on stage - clear selection or ready to generate new rectangle
        if (event.target.className === 'Image') {
            const stage = event
                .target
                .getStage();
            const mousePos = stage.getPointerPosition();
            this.setState({mouseDown: true, newRectX: mousePos.x, newRectY: mousePos.y, selectedShapeName: ''});
            return;
        }
        // clicked on transformer - do nothing
        const clickedOnTransformer = event
            .target
            .getParent()
            .className === 'Transformer';
        if (clickedOnTransformer) {
            return;
        }

        // find clicked rect by its name
        const name = event
            .target
            .name();
        const rect = rectangles.find(r => r.name === name);
        if (rect) {
            this.setState({selectedShapeName: name, rectangles});
        } else {
            this.setState({selectedShapeName: ''});
        }
    };

    handleRectChange = (index, newProps) => {
        const {rectangles} = this.state;
        rectangles[index] = {
            ...rectangles[index],
            ...newProps
        };

        this.setState({rectangles});
    };

    handleNewRectChange = (event) => {
        const {rectangles, rectCount, newRectX, newRectY} = this.state;
        const stage = event
            .target
            .getStage();
        const mousePos = stage.getPointerPosition();
        if (!rectangles[rectCount]) {
            rectangles.push({
                x: newRectX,
                y: newRectY,
                width: mousePos.x - newRectX,
                height: mousePos - newRectY,
                name: `rect${rectCount + 1}`,
                stroke: '#00A3AA',
                key: shortid.generate()
            });
            return this.setState({rectangles, mouseDraw: true});
        }
        rectangles[rectCount].width = mousePos.x - newRectX;
        rectangles[rectCount].height = mousePos.y - newRectY;
        return this.setState({rectangles});
    };

    handleStageMouseUp = () => {
        const {rectCount, mouseDraw} = this.state;
        if (mouseDraw) {
            this.setState({
                rectCount: rectCount + 1,
                mouseDraw: false
            });
        }
        this.setState({mouseDown: false});
    };

    handleInputChange(event) {
        this.setState({url: event.target.value});
    }

    handleUrlSubmit(event) {
        event.preventDefault(); // prevent refresh after form send
        axios
            .post(process.env.REACT_APP_API_URL + '/getcounts', {"url": this.state.url})
            .then((response) => this.setState({counts: response.data}))
    }

    handleImageChange(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
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
        const {
            state: {
                rectangles,
                selectedShapeName,
                mouseDown
            },
            handleStageMouseDown,
            handleNewRectChange,
            handleRectChange,
            handleStageMouseUp
        } = this;

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
                    <input className="fileInput" type="file" onChange={this.handleImageChange}/> {imagePreviewUrl
                        ? (
                            <div className="imgPreview">
                                <RotateImage src={imagePreviewUrl}/>
                            </div>
                        )
                        : (
                            <div className="previewText"></div>
                        )}
                </div>
                <div id="app">
                    <Stage
                        ref={(node) => {
                        this.stage = node;
                    }}
                        container="app"
                        width={994}
                        height={640}
                        onMouseDown={handleStageMouseDown}
                        onTouchStart={handleStageMouseDown}
                        onMouseMove={mouseDown && handleNewRectChange}
                        onTouchMove={mouseDown && handleNewRectChange}
                        onMouseUp={mouseDown && handleStageMouseUp}
                        onTouchEnd={mouseDown && handleStageMouseUp}>
                        <Layer>
                            {rectangles.map((rect, i) => (<Rectangle
                                sclassName="rect"
                                key={rect.key}
                                {...rect}
                                onTransform={(newProps) => {
                                handleRectChange(i, newProps);
                            }}/>))}
                            <RectTransformer selectedShapeName={selectedShapeName}/>
                        </Layer>
                        <Layer
                            ref={(node) => {
                            this.img = node;
                        }}>
                            <AnnotationImage/>
                        </Layer>
                    </Stage>
                </div>
            </div>
        );
    }
}

export default App;
