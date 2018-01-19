import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainRoute from '../routes/Main';
import ShowRoute from '../routes/Show';
import RowHeader from '../RowHeader/index';
import CloseIcon from '../../svg/close.svg';
import ReactSVG from 'react-svg';
import RowHint from '../RowHint/index';
import Chips from '../Chips/index';
import IconButton from '../IconButton/index';
import Slot from '../Slot/index';
import Button from '../Button/index';
import Combobox from '../Combobox/index';
import Header from '../Header';
import injectSheet from 'react-jss';

const styles = {
  wrapper: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden'
  }
};

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Header />
        <Switch>
          <Route exact path="/" component={MainRoute} />
          <Route path="/show" component={ShowRoute} />
        </Switch>

        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <RowHint text={'Ржавый Фред'} />
        <Chips name={'Лекс Лютер'} email={'mathews.kyle@gmail.com'} />
        <IconButton>
          <ReactSVG
            path={CloseIcon}
            callback={svg => console.log(svg)}
            evalScript="always"
          />
        </IconButton>
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
export default injectSheet(styles)(App);
