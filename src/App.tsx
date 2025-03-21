import { TransferProvider } from './modules/transfers/states/TransferContext';
import { AppRouter } from './router/AppRouter';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { AccountProvider } from './modules/account/states/AccountContext';
import AuthProvider from './modules/auth/states/AuthContext/AuthProvider';

function App() {



  return (
    <ApolloProvider client={client}>
      <AuthProvider>

        <AccountProvider>
          <TransferProvider>
            <AppRouter />;
          </TransferProvider>
        </AccountProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App
