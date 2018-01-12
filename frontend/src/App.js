import React, { Component } from 'react';
import RowHeader from './components/RowHeader';
import RowHint from './components/RowHint';
import Chips from './components/Chips';
import IconButton from './components/IconButton';
import Slot from './components/Slot';
import Button from './components/Button';
import Combobox from './components/Combobox';

class App extends Component {
  render() {
    return (
      <div>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RowHeader text={'Ржавый Фред'} helperText={'3—6 человек'} />
        <RowHint text={'Ржавый Фред'} />
        <Chips name={'Лекс Лютер'} email={'mathews.kyle@gmail.com'} />
        <IconButton icon={'edit'} />
        <Slot disabled={true} />
        <Slot />
        <Button text={'Создать встречу'} primary={true} />
        <Button text={'Создать встречу'} primary={true} disabled={true} />
        <Button text={'Отмена'} />
        <Button text={'Отмена'} disabled={true} />
        <Combobox />
      </div>
    );
  }
}

export default App;
