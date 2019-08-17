import React, { Component } from "react";
import "./projects.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Projects extends Component {
  createNewProject = () => {
    let projectname = document.getElementById("newProject").value;
    var http = new XMLHttpRequest();
    let params = "?n=" + projectname;
    var url = "/api/projects" + params;

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();
    this.componentDidMount();
    document.getElementById("newProject").value = "";
  };

  constructor() {
    super();
    this.state = {
      option: []
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
        <h2>Projects</h2>
        <input type="text" placeholder="Create new project" id="newProject" />
        <button class="btn-default" onClick={this.createNewProject}>
          Submit
        </button>
        <ul>
          {this.state.option.map(option => (
            <li key={option.id}>
              <a href={option.name}>{option.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Projects;
