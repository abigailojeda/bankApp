import { TransferProvider } from './modules/transfers/states/TransferContext';
import { AppRouter } from './router/AppRouter';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { AccountProvider } from './modules/account/states/AccountContext';
import AuthProvider from './modules/auth/states/AuthContext/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { CurrencyProvider } from './modules/account/states/CurrencyContext';
import CardProvider from './modules/cards/states/CardContext/CardProvider';

function App() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>

        <AccountProvider>
          <CurrencyProvider>
            <TransferProvider>
              <CardProvider>
                <AppRouter />
                <ToastContainer
                  closeButton={false}
                  toastStyle={{ backgroundColor: "var(--color-toasterbg)" }}
                  theme="colored"
                />
              </CardProvider>
            </TransferProvider>
          </CurrencyProvider>
        </AccountProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App
