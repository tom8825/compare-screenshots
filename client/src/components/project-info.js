import React, { Component } from "react";
import "./project-info.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Gallery from "./gallery";

class ProjectInfo extends Component {
  constructor() {
    super();
    this.state = {
      currentProject: "",
      baseImagePath: ""
    };
  }

  async setBaseImage(url) {
    if (this.props.currentProject === "select a project") {
      alert("please select a project first");
    } else {
      console.log(this.props.currentProject);
      console.log(url);
      await fetch(
        "/api/projects/base-image?n=" +
          this.props.currentProject +
          "&url=" +
          url,
        { method: "POST" }
      ).then(res => console.log(res));
      await alert("Success");
    }
  }

  render() {
    return (
      <div id="project-info">
        <h2>Project - {this.props.currentProject}</h2>

        <div id="setNewBaseImage">
          <input
            type="text"
            name="newBaseInput"
            id="newBaseInput"
            placeholder="Set New Base Image"
          />
          <button
            type="button"
            id="newBaseInputBtn"
            onClick={() =>
              this.setBaseImage(document.getElementById("newBaseInput").value)
            }
          >
            Submit
          </button>
        </div>
        <div id="setCompareBaseToNew">
          <form>
            <input
              type="text"
              name="CompareBaseInput"
              id="CompareBaseInput"
              placeholder="Compare URL to Base Image"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <br />
        <br />
        <div id="imageGallery">
          <Gallery currentProject={this.props.currentProject} />
        </div>
      </div>
    );
  }
}

export default ProjectInfo;
