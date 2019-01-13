import React, {Component} from 'react';

class RotateImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rotation: 0
        }
        this.rotate = this
            .rotate
            .bind(this);
    }

    rotate(event) {
        let side = event.target.value;
        let diff = side === "right"
            ? 90
            : -90;
        let rotation = this.state.rotation + diff;
        this.setState({rotation: rotation})
    }

    render() {
        return (
            <div>
                <input onClick={this.rotate} type="button" value="left"/>
                <img
                    style={{
                    transform: `rotate(${this.state.rotation}deg)`
                }}
                    src={this.props.src}
                    width="400"
                    alt=""/>
                <input onClick={this.rotate} type="button" value="right"/>
            </div>
        )
    }
};

export default RotateImage;