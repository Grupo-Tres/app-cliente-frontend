import React, { useEffect, useState } from "react";
import "./Homescreen.css";
import Produto from "../../component/Produto/Produto";
import Cabecalho from "../../component/Cabecalho/Cabecalho";
import Container from "../../component/Container/Container";
import Item from "../../component/Item/Item";

function Homescreen() {
  const [secoes, setSecoes] = useState(null);

  useEffect(() => {
    if (secoes === null) {
      fetch("http://localhost:5000/api/v1/cardapio")
        .then(function (resposta) {
          const resultado = {
            estado: resposta.status,
            res: resposta.json(),
          };
          return resultado;
        })
        .then(function (respostaFinal) {
          if (respostaFinal.estado !== 200) {
            respostaFinal.res.then(function (erroResult) {
              console.log(erroResult);
            });
          } else {
            respostaFinal.res.then(function (dados) {
              gerar_secoes(dados);
            });
          }
        })
        .catch((error) => {
          gerar_secoes([]);
          alert(`${error} \n Servidor backend não encontrado`);
        });
    }
  });

  const gerar_secoes = (dadosArray) => {
    const array_secoes = dadosArray.map((item) => {
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
    setSecoes(array_secoes);
  };

  return (
    <div>
      <Cabecalho />
      <div>{secoes}</div>
    </div>
  );
}

export default Homescreen;
