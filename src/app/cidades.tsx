import * as React from 'react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import { Loading } from './loading';

const Query = gql`
  query cidades {
    cidades {
      id
      nome
      uf
    }
  }
`;

const Component = ({ data: { cidades, loading } }) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ marginTop: '5px' }}>
      <Helmet>
        <title>Cidades</title>
        <meta name='description' content='Cidades descriptions' />
        <meta property='og:title' content='Cidades Facebook' />
        <meta property='og:site_name' content='Cidades Site Facebook' />
        <meta property='og:description' content='Cidades Description Facebook' />
      </Helmet>
      <Header as='h2' icon textAlign='center'>
        <Icon name='map' circular />
        <Header.Content>Cidades</Header.Content>
      </Header>
      <Container textAlign='center'>
        <List>
          {cidades.map(cidade => (
            <List.Item key={cidade.id}>
              <List.Header>
                <Link to={'/' + cidade.id}>{cidade.nome} / {cidade.uf}</Link>
              </List.Header>
            </List.Item>
          ))}
        </List>
      </Container>
    </div>
  );
};

export const Cidades = graphql(Query)(Component) as any;
