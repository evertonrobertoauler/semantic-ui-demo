import './browser.scss';
import 'es6-promise';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app/app';

render(<App />, document.getElementById('root'), () => {
  console.log('rendered');
});
