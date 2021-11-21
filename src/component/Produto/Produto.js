import React, { useState } from "react";
import "./Produto.css";

function Produto(produto) {
  const [quantidade, setQuantidade] = useState(1);
  const [opcaoIndex, setOpcaoIndex] = useState(0);

  function click() {
    console.log('Selecionado: ', {
      produtoId: produto.children.id,
      opcao: opcaoIndex,
      quantidade: quantidade,
      valorTotal: produto.children.opcoes[opcaoIndex].preco * quantidade
    });
  }

  return (
    <div className="container">
      <div class="produto_titulo">{produto.children.nome.toUpperCase()}</div>
      <div class="produto_detalhes">
        <div class="sec-1">
          <img class="produto_imagem" alt="" src={produto.children.foto} />
        </div>
        <div class="sec-2">
          <div class="lb-opcao">Opção:</div>
          <div class="lb-quantidade">Quantidade:</div>
        </div>
        <div class="sec-3">
          <div class="combo-opcao">
            <select
              className="sel-opcao"
              value={opcaoIndex}
              onChange={(e) => {
                setOpcaoIndex(parseInt(e.target.value));
              }}
            >
              {produto.children.opcoes.map((item, indice) => {
                return <option value={indice}>{item.opcao}</option>;
              })}
            </select>
          </div>
          <div class="contador-quantidade">
            <button
              className="btn-red"
              onClick={() => {
                quantidade > 1
                  ? setQuantidade(quantidade - 1)
                  : setQuantidade(1);
              }}
            >
              -
            </button>
            <div className="btn-quant">{quantidade}</div>
            <button
              className="btn-add"
              onClick={() => setQuantidade(quantidade + 1)}
            >
              +
            </button>
          </div>
          <div class="preco">
             <h6>
              {" "}
              { 
                (produto.children.opcoes[opcaoIndex].preco * quantidade).toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )}
            </h6>  
            
          </div>
          <div class="botao-adicionar">
            <button 
              className="btn-add-carrinho"
              onClick={click} >Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Produto;
