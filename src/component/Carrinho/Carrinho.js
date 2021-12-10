import "./carrinho.css";
import Cookies from "universal-cookie";
import { Button } from 'react-bootstrap';
//import ReactDOM from "react-dom";
import React, { useState } from "react";

const cookies = new Cookies();

function Carrinho(dados) {
  //const carrinho = cookies.get('carrinho');
  //const [compras, setCompras] = useState('');

  function esvaziarCarrinho() {
    cookies.remove("carrinho");
    window.location.reload();
  }
  const cookieCarrinho = cookies.get("carrinho");

  const subTotal = cookieCarrinho.pedido.subTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const taxaEntrega = (cookieCarrinho.pedido.taxaEntrega).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const total = (cookieCarrinho.pedido.total).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });


  let linha = [];
  cookieCarrinho.carrinho.forEach((element) => {
    linha.push(
      <tr>
        <td>{element.quantidade}</td>
        <td>{element.nome}</td>
        <td>{element.opcao}</td>
        <td>{element.preco}</td>
        <td>{element.preco * element.quantidade}</td>
      </tr>
    );
  });



  return (
    <div class="carrinho">
      <div>Número do pedido: {cookieCarrinho.pedido.numeroPedido}</div>
      <div onClick={esvaziarCarrinho}>Esvaziar carrinho</div>
      <table>
        <tr>
          <th>Quant</th>
          <th>Nome</th>
          <th>Opção</th>
          <th>Preço</th>
          <th>Total</th>
        </tr>
        <React.Fragment>{linha}</React.Fragment>
      </table>

      <div>Subtotal: {subTotal}</div>
      <div>Taxa de entrega: {taxaEntrega}</div>
      <div>Total: {total}</div>
      <Button 
              className="btn-finalizar"
              variant="success"
              onClick={null} >Finalizar</Button>
    </div>
  );
}

export default Carrinho;
