import { TransferProvider } from './modules/transfers/states/TransferContext';
import { AppRouter } from './router/AppRouter';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { AccountProvider } from './modules/account/states/AccountContext';
import AuthProvider from './modules/auth/states/AuthContext/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { CurrencyProvider } from './modules/account/states/CurrencyContext';

function App() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>

        <AccountProvider>
          <CurrencyProvider>
            <TransferProvider>
              <AppRouter />

              <ToastContainer
                closeButton={false}
                toastStyle={{ backgroundColor: "var(--color-toasterbg)" }}
                theme="colored"
              />

            </TransferProvider>
          </CurrencyProvider>
        </AccountProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App
