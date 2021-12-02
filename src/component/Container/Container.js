import './Container.css'
//import data from '../../dataMock'
import React from 'react';
//import { render } from '@testing-library/react';
//import Item from '../Item/Item'
//import Produto from '../Produto/Produto'

function Container(params) {


  return (
    
    <section className={params.secaoClass}>

    <h3 className="secaoTitle">{params.title}</h3>
    <hr />
    <div className="flex-container">
        {params.children}
    </div>
    </section>
    
  );
}

export default Container;
