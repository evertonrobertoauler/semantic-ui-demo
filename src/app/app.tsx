import * as React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import { Helmet } from 'react-helmet';

export const App = () => {
  return (
    <div style={{ marginTop: '5px' }}>
      <Helmet>
        <title>Helmet</title>
        <meta name='description' content='Helmet application' />
        <meta property='og:title' content='Helmet Facebook' />
        <meta property='og:site_name' content='Helmet Site Facebook' />
        <meta property='og:description' content='Helmet Description Facebook' />
      </Helmet>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>Friends</Header.Content>
      </Header>
      <Container textAlign='center'>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
      </Container>
    </div>
  );
}
