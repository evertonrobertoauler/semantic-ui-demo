import * as React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';

export const App = () => {
  return (
    <div style={{ marginTop: '5px' }}>
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
