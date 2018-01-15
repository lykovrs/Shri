import React, { Component } from 'react';
import RowHeader from '../RowHeader/index';
import RowHint from '../RowHint/index';
import Chips from '../Chips/index';
import IconButton from '../IconButton/index';
import Slot from '../Slot/index';
import Button from '../Button/index';
import Combobox from '../Combobox/index';

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
