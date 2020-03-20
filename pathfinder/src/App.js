import React, { Component } from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <PathfindingVisualizer></PathfindingVisualizer>
      </div>
    );
  }
}

export default App;
