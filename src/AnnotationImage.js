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
    //image.src = this.props.image;
    image.src =
      "https://s3-ap-northeast-1.amazonaws.com/uploads-jp.hipchat.com/119782/5591318/0GFMfb0v0xHieft/upload.png";
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
