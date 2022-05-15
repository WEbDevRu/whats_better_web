import { ApolloClient, InMemoryCache } from '@apollo/client';
import { publicConfig } from './publicConfig';

const client = new ApolloClient({
    uri: publicConfig.appEnv === 'local' ? 'http://localhost:3001/graphql' : 'http://admin.nikrainev.ru/graphql',
    cache: new InMemoryCache(),
});

export default client;