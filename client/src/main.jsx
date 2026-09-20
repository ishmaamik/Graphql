import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

const httplink= new HttpLink({
  uri:'http://localhost:8000/graphql'
})

const client= new ApolloClient({
  link: httplink,
  cache: new InMemoryCache()
})
createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
  <StrictMode>
    <App />
  </StrictMode>
  </ApolloProvider>,
)
