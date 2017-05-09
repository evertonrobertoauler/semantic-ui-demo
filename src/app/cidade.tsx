import * as React from 'react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Helmet } from 'react-helmet';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Loading } from './loading';

const Query = gql`
  query cidade($id: Int!) {
    cidade(id: $id) {
      id
      nome
      uf
    }
  }
`;

const Component = ({ data: { cidade, loading } }) => {
  if (loading) {
    return <Loading />;
  }

  const nome = cidade.nome + ' / ' + cidade.uf;

  return (
    <div style={{ marginTop: '5px' }}>
      <Helmet>
        <title>{nome}</title>
        <meta name='description' content='Cidades descriptions' />
        <meta property='og:title' content='Cidades Facebook' />
        <meta property='og:site_name' content='Cidades Site Facebook' />
        <meta property='og:description' content='Cidades Description Facebook' />
      </Helmet>
      <Header as='h2' icon textAlign='center'>
        <Icon name='home' circular />
        <Header.Content>{nome}</Header.Content>
      </Header>
      <Container textAlign='center'>
        <Link to='/'><Button primary>Voltar</Button></Link>
      </Container>
    </div>
  );
};

export const Cidade = graphql(Query, { options: ({ id }) => ({ variables: { id } }) })(Component) as any;
