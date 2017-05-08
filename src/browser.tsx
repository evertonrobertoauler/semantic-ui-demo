import './browser.scss';
import 'es6-promise';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app/app';

// if (process.env.NODE_ENV !== 'production') {
//   const logError = console.error.bind(console);

//   console.error = (...err: any[]) => {
//     if (typeof err[0] !== 'string' || !err[0].match(/React attempted to reuse markup/)) {
//       logError(...err);
//     }
//   };
// }

render(<App />, document.getElementById('root'), () => {
  console.log('rendered');
});
