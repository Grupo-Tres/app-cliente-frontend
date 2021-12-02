import React from 'react';
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Container from "./component/Container/Container";
import Item from "./component/Item/Item";
import Produto from "./component/Produto/Produto";
import Cabecalho from "./component/Cabecalho/Cabecalho"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

fetch('http://localhost:5000/api/v1/cardapio')
    .then(function(resposta){
        const resultado = {
            estado: resposta.status,
            res: resposta.json()
        }
        return resultado;
    })
    .then(function(respostaFinal) {
        if (respostaFinal.estado !== 200) {
            respostaFinal.res.then(function(erroResult){
                console.log(erroResult);
            })
        } else {
            respostaFinal.res.then(function(dados){
                renderizar(dados);                
            });
        }
    });


function renderizar(dadosArray) {
  
  const secoes = dadosArray.map((item) => {
    const produtos = item.produtos.map((produto) => {
      return (
        <Item>
          <Produto>{produto}</Produto>
        </Item>
      );
    });
    return (
      <React.Fragment>
        <Container secaoClass={item.secaoId} title={item.sessaoName}>
          {produtos}
        </Container>
      </React.Fragment>
    );
  });
  
  ReactDOM.render(
    <React.StrictMode>
        <Cabecalho></Cabecalho>
        <React.Fragment>{secoes}</React.Fragment>
    </React.StrictMode>,
    document.getElementsByClassName("cardapio")[0]
  );
  
  reportWebVitals();
  
}
