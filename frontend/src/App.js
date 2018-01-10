import React, { Component } from 'react';
import Designator from './components/Designator';
import RowNotificator from './components/RowNotificator';

class App extends Component {
  render() {
    return (
      <div>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Designator text={'Ржавый Фред'} helperText={'3—6 человек'} />
        <RowNotificator text={'Ржавый Фред'} />
      </div>
    );
  }
}

export default App;
