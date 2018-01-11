import React, { Component } from 'react';
import RowHeader from './components/RowHeader';
import RowHint from './components/RowHint';
import Chips from './components/Chips';
import IconButton from './components/IconButton';

class App extends Component {
  render() {
    return (
      <div>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RowHeader text={'Ржавый Фред'} helperText={'3—6 человек'} />
        <RowHint text={'Ржавый Фред'} />
        <Chips
          text={'Лекс Лютер'}
          img={
            'https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-200w.jpeg'
          }
        />
        <IconButton icon={'edit'} />
      </div>
    );
  }
}

export default App;
