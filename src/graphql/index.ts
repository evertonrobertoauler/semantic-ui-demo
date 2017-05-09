import { makeExecutableSchema } from 'graphql-tools/dist/schemaGenerator';

const cidades = [
  { id: 1, nome: 'Não-Me-Toque', uf: 'RS' },
  { id: 2, nome: 'Carazinho', uf: 'RS' },
  { id: 3, nome: 'Sarandi', uf: 'RS' },
];

export async function getSchema() {
  const typeDefs = `
    type Cidade {
      id: Int!
      nome: String!
      uf: String!
    }

    type Query {
      cidades: [Cidade],
      cidade(id: Int!): Cidade
    }

    type Mutation {
      hello(text: String!): String
    }

    schema {
      query: Query
      mutation: Mutation
    }
`;

  const resolvers = {
    Query: {
      async cidades() {
        return Promise.resolve(cidades);
      },
      async cidade(_, { id }) {
        return Promise.resolve(cidades.filter(c => c.id === id)[0]);
      }
    },
    Mutation: {
      hello(_, { text }) {
        return `Hello ${text}!`;
      }
    }
  };

  return makeExecutableSchema({ typeDefs, resolvers });
}
