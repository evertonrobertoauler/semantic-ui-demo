import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { App } from './app/app';
import { readFileSync } from 'fs';
import { Helmet } from 'react-helmet';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { getSchema } from './graphql';
import { renderToStringWithData, ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';
import { StaticRouter } from 'react-router-dom';

(global as any).fetch = fetch;

const PORT = 3000;
const URL = `http://localhost:${PORT}`;

const css = readFileSync('dist/public/browser.css');

async function createServer() {
  const app = express();
  const schema = await getSchema();

  app.use(bodyParser.json());

  app.use(compression());

  app.get('*.*', express.static('dist/public'));

  app.use('/graphql', graphqlExpress({ schema }));

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  app.get('*', async (req, res) => {
    try {

      const { headers } = req;
      const networkInterface = createNetworkInterface({ uri: `${URL}/graphql`, opts: { headers } });
      const client = new ApolloClient({ networkInterface, ssrMode: true });

      const content = await renderToStringWithData(
        <ApolloProvider client={client}>
          <StaticRouter location={req.url} context={{}}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      );

      const helmet = Helmet.renderStatic();

      const initialState = { apollo: client.getInitialState() };

      const html = `
      <html ${helmet.htmlAttributes.toString()}>
        <head>
          <link rel="shortcut icon" type="image/x-icon" href="assets/logo.png" />
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <style>${css}</style>
          <script>
            window.__APOLLO_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${content}</div>
          <script src="browser.js"></script>
        </body>
      </html>
`;

      res.send(html);
    } catch (e) {
      res.send(500, 'Ocorreu um erro!');
    }
  });

  return new Promise(resolve => app.listen(PORT, resolve));
}

createServer()
  .then(() => console.log(`Listening on ${URL}!`));
