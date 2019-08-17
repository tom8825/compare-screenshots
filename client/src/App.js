import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Projects from "./components/projects";
import ProjectInfo from "./components/project-info";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">JS Visual Regression Tester</h1>
        </header>
        <div id="projects">
          <Projects />
        </div>
        <div id="project-info">
          <ProjectInfo />
        </div>
      </div>
    );
  }
}

export default App;
