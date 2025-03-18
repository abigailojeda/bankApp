import { TransferProvider } from './modules/transfers/states/TransferContext';
import { AppRouter } from './router/AppRouter';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';

function App() {

  return (
    <ApolloProvider client={client}>
    <TransferProvider>
      <AppRouter />;
    </TransferProvider>
    </ApolloProvider>
  );
}

export default App
