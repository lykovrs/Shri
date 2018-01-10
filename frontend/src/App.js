import React, { Component } from 'react';
import RowHeader from './components/RowHeader';
import RowHint from './components/RowHint';

class App extends Component {
  render() {
    return (
      <div>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RowHeader text={'Ржавый Фред'} helperText={'3—6 человек'} />
        <RowHint text={'Ржавый Фред'} />
      </div>
    );
  }
}

export default App;
