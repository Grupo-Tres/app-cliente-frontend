import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Container from "./component/Container/Container";
import Item from "./component/Item/Item";
import Produto from "./component/Produto/Produto";
import data from "./dataMock";

const secoes = data.map((item) => {
  const produtos = item.produtos.map((produto) => {
    return (
      <Item>
        <Produto>{produto}</Produto>
      </Item>
    );
  });
  return (
    <React.Fragment>
      <Container secaoClass={item.secao} title={item.titulo}>
        {produtos}
      </Container>
    </React.Fragment>
  );
});

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>{secoes}</React.Fragment>
  </React.StrictMode>,
  document.getElementsByClassName("cardapio")[0]
);

reportWebVitals();
