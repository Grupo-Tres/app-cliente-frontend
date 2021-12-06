import './App.css';
import React from 'react';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homescreen from './Screens/Homescreen/Homescreen.js';
import Cadastro from './Screens/Cadastro/Cadastro.js';
import Contato from './Screens/Contato/Contato.js';

function App() {
  return (
   <Router>
     <Routes>
        <Route element = { <Homescreen /> }  path="/" exact />
        <Route element = { <Contato /> }  path="/contato" exact />
        <Route element = { <Cadastro /> }  path="/cadastro" />

     </Routes>
   </Router>
  );
}

export default App;
