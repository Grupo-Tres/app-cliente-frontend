import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Homescreen from './Screens/Homescreen/Homescreen.js';
import Cadastro from './Screens/Cadastro/Cadastro.js';
import Contato from './Screens/Contato/Contato.js';
import Layout from './component/Layout/Layout';
import { Route } from 'react-router';

function App() {
  return (
      <Layout>
        <Router>
          <Routes>
              <Route element = { <Homescreen /> }  path="/" exact />
              <Route element = { <Contato /> }  path="/contato" exact />
              <Route element = { <Cadastro /> }  path="/cadastro" />
          </Routes>
        </Router>
      </Layout>
  );
}

export default App;
