import React, { Component } from "react";
import "./project-info.css";
import "bootstrap/dist/css/bootstrap.min.css";

class ProjectInfo extends Component {
  constructor() {
    super();
    this.state = {
      currentProject: "",
      baseImagePath: ""
    };
  }

  render() {
    return (
      <div id="gallery-main">
        <img
          id="project-base-image"
          alt="base unavailable"
          src={
            window.location.origin +
            "/regression-projects/" +
            this.props.currentProject +
            "/" +
            this.props.currentProject +
            "-base.png"
          }
        />
      </div>
    );
  }
}

export default ProjectInfo;
