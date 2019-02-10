import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from 'components/home';
import Navbar from 'components/navbar';
import './App.scss';

class App extends Component {
  componentDidMount() {
    setTimeout(() => console.log('Hello world once'), 0);
    console.log('Hello world twice');
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
