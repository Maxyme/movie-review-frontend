import React from "react";
import { Rect } from "react-konva";

class Rectangle extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter = event => {
    const shape = event.target;
    shape.stroke("#3DF6FF");
    shape.opacity(0.3);
    shape.getStage().container().style.cursor = "move";
    // this.rect.draw();  // if use rect.draw(), the new rectangle will cover its transformer
    this.rect.getLayer().draw();
  };

  handleMouseLeave = event => {
    const shape = event.target;
    shape.stroke("#00A3AA");
    shape.opacity(0.4);
    shape.getStage().container().style.cursor = "crosshair";
    // this.rect.draw();
    this.rect.getLayer().draw();
  };

  handleDragMove = event => {
    const shape = event.target;
    shape.x = event.target.x;
    shape.y = event.target.y;
  };

  handleDragEnd = event => {
    const shape = event.target;
    shape.x = event.target.x;
    shape.y = event.target.y;
  };

  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        fill={this.props.fill}
        name={this.props.name}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onDragMove={this.handleDragMove}
        onDragEnd={this.handleDragEnd}
        draggable
        ref={node => {
          this.rect = node;
        }}
      />
    );
  }
}

export default Rectangle;
