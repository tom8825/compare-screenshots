import React, { Component } from "react";
import "./projects.css";
import "bootstrap/dist/css/bootstrap.min.css";

class ProjectInfo extends Component {
  constructor() {
    super();
    this.state = {
      currentProject: ""
    };
  }

  componentDidMount() {
    fetch("/api/projects")
      .then(res => res.json())
      .then(option =>
        this.setState({ option }, () =>
          console.log("option fetched...", option)
        )
      );
  }

  render() {
    return (
      <div>
        <h2>Project Info</h2>
        <h4>{this.currentProject}</h4>
      </div>
    );
  }
}

export default ProjectInfo;
