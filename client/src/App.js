import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

import Navbar from "./components/Navbar";
import NewsContent from "./components/Newscontent";
import FavoriteNews from "./pages/FavoriteNews";
<<<<<<< HEAD
import Form from "./components/SearchForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Form />
      <Routes>
        <Route path="/" element={<NewsContent />}></Route>
        <Route path="/favorites" element={<FavoriteNews />}></Route>
      </Routes>
    </BrowserRouter>
=======

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<NewsContent />}></Route>
          <Route path="/favorites" element={<FavoriteNews />}></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
>>>>>>> cf58598ab6f707f66d1a49799a16f441c4d1aba4
  );
}

export default App;
