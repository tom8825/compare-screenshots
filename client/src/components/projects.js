import React, { Component } from "react";
import "./projects.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectInfo from "./project-info";

class Projects extends Component {
  setCurrentProject = option => {
    this.setState({
      currentProject: option
    });
  };

  createNewProject = () => {
    let projectname = document.getElementById("newProject").value;
    projectname = projectname.replace(/\s+/g, "-");
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
      option: [],
      currentProject: "select a project"
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
      <div id="projects-main">
        <div id="projects">
          <h2>Projects</h2>
          <input type="text" placeholder="Create new project" id="newProject" />
          <button class="btn-default" onClick={this.createNewProject}>
            Submit
          </button>
          <ul>
            {this.state.option.map(option => (
              <li key={option.id}>
                <a onClick={() => this.setCurrentProject(option.name)}>
                  {option.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ProjectInfo currentProject={this.state.currentProject} />
        </div>
      </div>
    );
  }
}

export default Projects;
