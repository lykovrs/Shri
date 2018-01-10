import React, { Component } from 'react';
import Designator from './components/Designator';

class App extends Component {
  render() {
    return (
      <div>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Designator text={'Ржавый Фред'} helperText={'3—6 человек'} />
      </div>
    );
  }
}

export default App;
