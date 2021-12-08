import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Homescreen from './Screens/Homescreen/Homescreen.js';
import Cadastro from './Screens/Cadastro/Cadastro.js';
import Contato from './Screens/Contato/Contato.js';
import Layout from './component/Layout/Layout';
import { Route } from 'react-router';
import { userContext } from './userContext';

const user = { nome: null, token: null};

function App() {
  return (
    <userContext.Provider value={user}>
      <Layout>
        <Router>
          <Routes>
              <Route element = { <Homescreen /> }  path="/" exact />
              <Route element = { <Contato /> }  path="/contato" exact />
              <Route element = { <Cadastro /> }  path="/cadastro" />
          </Routes>
        </Router>
      </Layout>
    </userContext.Provider>
  );
}

export default App;
