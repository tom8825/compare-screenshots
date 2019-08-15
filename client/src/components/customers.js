import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      option: []
    };
  }

  componentDidMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then(option => this.setState({option}, () => console.log('option fetched...', option)));
  }

  render() {
    return (
      <div>
        <h2>Projects</h2>
        <ul>
        {this.state.option.map(option => 
          <li key={option.id}>{option.name}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Customers;
