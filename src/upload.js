import * as tf from '@tensorflow/tfjs';
import React from "react";
import MagicDropzone from "react-magic-dropzone";
// import "./upload.css";
// import * as svg from "./images/undraw_duplicate_re_d39g.svg";

const weights = '/facemask-detector/model.json';

const [modelWeight, modelHeight] = [640, 640];
const names = ['incorrect', 'mask', 'no-mask'];
const colors = ['#FFDE80', '#66FF80', '#FF6584'];

class UploadApp extends React.Component {
  state = {
    model: null,
    preview: "",
    predictions: []
  };

  async componentDidMount() {
    let model = await tf.loadGraphModel(weights);
    this.setState({ model });
  }

  onDrop = (accepted, rejected, links) => {
    this.setState({ preview: accepted[0].preview || links[0] });
  };

  cropToCanvas = (image, canvas, ctx) => {
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const ratio = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const newWidth = Math.round(naturalWidth * ratio);
    const newHeight = Math.round(naturalHeight * ratio);
    ctx.drawImage(
      image,
      0,
      0,
      naturalWidth,
      naturalHeight,
      (canvas.width - newWidth) / 2,
      (canvas.height - newHeight) / 2,
      newWidth,
      newHeight,
    );

  };

  onImageChange = async e => {
    const c = document.getElementById("image-canvas");
    const ctx = c.getContext("2d");
    this.cropToCanvas(e.target, c, ctx);

    const input = tf.tidy(() => {
      // console.log('input:', tf.image.resizeBilinear(tf.browser.fromPixels(c), [modelWeight, modelHeight])
      // .div(255.0).expandDims(0));
      return tf.image.resizeBilinear(tf.browser.fromPixels(c), [modelWeight, modelHeight])
        .div(255.0).expandDims(0);
    });


    const res = await this.state.model.executeAsync(input);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    const [boxes, scores, classes, valid_detections] = res;
    const boxes_data = boxes.dataSync();
    const scores_data = scores.dataSync();
    const classes_data = classes.dataSync();
    const valid_detections_data = valid_detections.dataSync()[0];

    tf.dispose(res)

    var i;
    const textHeight = parseInt(font, 10);
    for (i = 0; i < valid_detections_data; ++i) {
      let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
      x1 *= c.width;
      x2 *= c.width;
      y1 *= c.height;
      y2 *= c.height;
      const width = x2 - x1;
      const height = y2 - y1;
      const klass = names[classes_data[i]];
      const score = scores_data[i].toFixed(2);

      // Draw the bounding box.
      ctx.strokeStyle = colors[classes_data[i]];
      ctx.lineWidth = 4;
      ctx.strokeRect(x1, y1, width, height);

      // Draw the label background.
      ctx.fillStyle = colors[classes_data[i]];
      const textWidth = ctx.measureText(klass + ":" + score).width;
      // const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x1-2, y1-textHeight-4, textWidth + 4, textHeight + 4);
    }

    for (i = 0; i < valid_detections_data; ++i) {
      let [x1, y1, ,] = boxes_data.slice(i * 4, (i + 1) * 4);
      x1 *= c.width;
      y1 *= c.height;
      const klass = names[classes_data[i]];
      const score = scores_data[i].toFixed(2);

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#2f2e41";
      ctx.fillText(klass + ":" + score, x1, y1 - textHeight);

    };
  };

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center title">Face Mask Detection with YOLOv5</h2>
        <p className="text-center subtitle">Allow extension: .jpeg, .jpg, .png.</p>
        {this.state.model ? (
          <MagicDropzone
            className="dropzone d-inline-flex justify-content-center align-items-center"
            accept="image/jpeg, image/png, .jpg, .jpeg, .png"
            multiple={false}
            onDrop={this.onDrop}
          >
            {this.state.preview ? (
              <img
                alt="upload preview"
                onLoad={this.onImageChange}
                className="dropzone-img"
                src={this.state.preview}
              />
            ) : (
              <div className="d-flex flex-column justify-content-center align-self-center z-index-1 position-relative">
                <object data="./images/undraw_duplicate_re_d39g.svg" width="auto" height="100%"> </object>
                <p className="text-center">Choose or drop image</p>
              </div>             
            )}
            <canvas id="image-canvas" className="image-canvas mx-auto z-index-2 position-absolute" width="640" height="640" />
          </MagicDropzone>
        ) : (
          <div className="dropzone d-flex flex-column justify-content-center align-items-center">
            <div className="lds-ellipsis" id="ul-loader"><div></div><div></div><div></div><div></div></div>
            <p className="text-center">Loading model</p>            
          </div>
        )}
      </div>
    );
  }
}

export default UploadApp;