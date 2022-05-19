import SearchPage from './pages/SearchPage';
import './App.scss'
import { ApolloClient,ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'https://tmdb.sandbox.zoosh.ie/dev/graphql',
  cache: new InMemoryCache()
});
function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <SearchPage /> 
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
