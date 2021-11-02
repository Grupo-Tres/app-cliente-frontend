import './Container.css'
//import data from '../../dataMock'
import React from 'react';
//import { render } from '@testing-library/react';
//import Item from '../Item/Item'
//import Produto from '../Produto/Produto'

function Container(params) {


  return (
    
    <section class={params.secaoClass}>

    <h3 class="secaoTitle">{params.title}</h3>
    <div class="flex-container">
        {params.children}
    </div>
    </section>
    
  );
}

export default Container;
