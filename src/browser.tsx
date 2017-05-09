import './browser.scss';
import 'es6-promise';
import 'isomorphic-fetch';
import * as React from 'react';
import { render } from 'react-dom';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/app';

// if (process.env.NODE_ENV !== 'production') {
//   const logError = console.error.bind(console);

//   console.error = (...err: any[]) => {
//     if (typeof err[0] !== 'string' || !err[0].match(/React attempted to reuse markup/)) {
//       logError(...err);
//     }
//   };
// }

const networkInterface = createNetworkInterface({ uri: `/graphql` });
const client = new ApolloClient({
  networkInterface,
  initialState: (window as any).__APOLLO_STATE__,
  ssrForceFetchDelay: 100,
});

const Main = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

render(<Main />, document.getElementById('root'), () => {
  console.log('rendered');
});
