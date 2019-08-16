import React, { Component } from 'react';
import './projects.css';

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      option: []
    };
  }

  componentDidMount() {
    fetch('/api/projects')
      .then(res => res.json())
      .then(option => this.setState({option}, () => console.log('option fetched...', option)));
  }

  render() {
    return (
      <div>
        <h2>Projects</h2>
        <ul>
        {this.state.option.map(option => 
          <li key={option.id}><a href="http://google.com">{option.name}</a></li>
        )}
        </ul>
      </div>
    );
  }
}

export default Projects;
