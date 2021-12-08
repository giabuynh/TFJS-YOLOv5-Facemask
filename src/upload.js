import React from "react";
import MagicDropzone from "react-magic-dropzone";
import * as tf from '@tensorflow/tfjs';
import "./upload.css";
tf.setBackend('webgl');

const weights = '/facemask-detector/model.json';
const [modelWeight, modelHeight] = [640, 640];
const names = ['incorrect', 'mask', 'no-mask'];

class UploadApp extends React.Component {
  state = {
    model: null,
    preview: "",
    predictions: []
  };

  componentDidMount() {
    tf.loadGraphModel(weights).then(model => {
      this.setState({
        model: model
      });
    });
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

  onImageChange = e => {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    this.cropToCanvas(e.target, c, ctx);
    const input = tf.tidy(() => {
      // console.log('input:', tf.image.resizeBilinear(tf.browser.fromPixels(c), [modelWeight, modelHeight])
      // .div(255.0).expandDims(0));
      return tf.image.resizeBilinear(tf.browser.fromPixels(c), [modelWeight, modelHeight])
        .div(255.0).expandDims(0);
    });
    this.state.model.executeAsync(input).then(res => {      
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
      for (i = 0; i < valid_detections_data; ++i){
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
        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x1, y1, width, height);

        // Draw the label background.
        ctx.fillStyle = "#00FFFF";
        const textWidth = ctx.measureText(klass + ":" + score).width;
        const textHeight = parseInt(font, 10); // base 10
        ctx.fillRect(x1, y1, textWidth + 4, textHeight + 4);

      }
      for (i = 0; i < valid_detections_data; ++i){
        let [x1, y1, , ] = boxes_data.slice(i * 4, (i + 1) * 4);
        x1 *= c.width;
        y1 *= c.height;
        const klass = names[classes_data[i]];
        const score = scores_data[i].toFixed(2);

        // Draw the text last to ensure it's on top.
        ctx.fillStyle = "#000000";
        ctx.fillText(klass + ":" + score, x1, y1);

      }
    });
  };

  render() {
    return (
      <div className="Dropzone-page">
        {this.state.model ? (
          <MagicDropzone
            className="Dropzone"
            accept="image/jpeg, image/png, .jpg, .jpeg, .png"
            multiple={false}
            onDrop={this.onDrop}
          >
            {this.state.preview ? (
              <img
                alt="upload preview"
                onLoad={this.onImageChange}
                className="Dropzone-img"
                src={this.state.preview}
              />
            ) : (
              "Choose or drop a file."
            )}
            <canvas id="canvas" width="640" height="640" />
          </MagicDropzone>
        ) : (
          <div className="Dropzone">Loading model...</div>
        )}
      </div>
    );
  }
}

export default UploadApp;



{/* <form method="post" id="upload-form" class="d-flex flex-column justify-content-center align-items-center mt-100" enctype="multipart/form-data">
            {% csrf_token %}
<!--            <div class="input-file-container" style="border: 1px solid black">-->
<!--                {{ form }}-->
<!--            </div>-->

            <div class="input-file-container container-lg d-flex flex-column justify-content-center align-items-center">
<!--                <object data="{%  static 'images/undraw_duplicate_re_d39g.svg' %}" width="auto" height="50%"> </object>-->
                <object data="../static/images/undraw_duplicate_re_d39g.svg" width="auto" height="50%"> </object>
                <input class="input-file d-none" name="file" id="file" type="file" accept=".mp4,.jpeg,.jpg,.png" value="GiaBuynh">
                <input class="d-none" name="action" type="hidden" value="upload">
                <div class="d-inline-flex">
                    <label tabindex="0" for="file" class="input-label col">Select a file</label>
<!--                    <button type="submit" class="col upload-button">Upload</button>-->
                </div>
            </div>
          <p class="file-return"></p>
        </form>

        {% if uploaded_file_urls %}
        <div class="d-flex flex-column justify-content-center align-items-center">
            <form method="post" id="detect-form" class="d-flex flex-column justify-content-center align-items-center" enctype="multipart/form-data">
                {% csrf_token %}
                <div class="col d-flex flex-row justify-content-center align-items-center">
                    <h2 class="text-center title">Successfully uploaded:</h2>
                    <button type="submit" class="col detect-button">Detect</button>
                </div>

                <input type="hidden" name="action" value="detect">
                <div class="row">
                    {% for url in uploaded_file_urls %}
                    <img src="{{ url }}" class="uploaded-file col">
                    <input type="hidden" name="urls" value="{{ url }}">
                    {% endfor %}
                </div>
            </form>

        </div>
        {% endif %}

        {% if detected_file_urls %}
        <div class="d-flex flex-column justify-content-center align-items-center">
            <h2 class="text-center title">Result:</h2>
            <div class="col">
                {% for url in detected_file_urls %}
                <img src="{{ url }}" class="detected-file">
                {% endfor %}
            </div>
        </div>
        {% endif %}

        <script>
            document.getElementById("file").onchange = function() {
                document.getElementById("upload-form").submit();
            };
        </script> */}