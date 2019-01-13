import React from "react";
import { Image } from "react-konva";

class AnnotationImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.src;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  render() {
    return <Image height={this.props.height} width={this.props.width} image={this.state.image} />;
  }
}

export default AnnotationImage;
