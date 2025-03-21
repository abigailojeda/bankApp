import { TransferProvider } from './modules/transfers/states/TransferContext';
import { AppRouter } from './router/AppRouter';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { AccountProvider } from './modules/account/states/AccountContext';

function App() {



  return (
    <ApolloProvider client={client}>
      <AccountProvider>
        <TransferProvider>
          <AppRouter />;
        </TransferProvider>
      </AccountProvider>
    </ApolloProvider>
  );
}

export default App
