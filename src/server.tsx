import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './app/app';
import { readFileSync } from 'fs';
import { Helmet } from 'react-helmet';

const PORT = 3000;

const css = readFileSync('dist/public/browser.css');

async function createServer() {
  const app = express();

  app.use(bodyParser.json());

  app.get('*.*', express.static('dist/public'));

  app.get('*', (req, res) => {

    const content = renderToString(<App />);

    const helmet = Helmet.renderStatic();

    const html = `
      <html ${helmet.htmlAttributes.toString()}>
        <head>
          <link rel="shortcut icon" type="image/x-icon" href="https://react.semantic-ui.com/logo.png" />
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <style>${css}</style>
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${content}</div>
          <script src="browser.js"></script>
        </body>
      </html>
`;

    res.send(html);

  });

  return new Promise(resolve => app.listen(PORT, resolve));
}

createServer()
  .then(() => console.log(`Listening on http://localhost:${PORT}`));
