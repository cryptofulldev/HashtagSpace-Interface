import { ApolloProvider } from '@apollo/client/react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { ConnectedRouter } from 'connected-react-router/immutable'
import React from 'react'
import { Provider } from 'react-redux'
import { client } from './apollo/client'
import Web3ReactManager from './components/Web3ReactManager'
import { NetworkContextName } from './constants/misc'
import { ThemeContextProvider } from './contexts/ThemeContext'
import store, { history } from './state'
import * as serviceWorker from './serviceWorker'
import getLibrary from './utils/getLibrary'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

export const Providers: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <Web3ReactManager>
                <ThemeContextProvider>{children}</ThemeContextProvider>
              </Web3ReactManager>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        </ConnectedRouter>
      </Provider>
    </ApolloProvider>
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
