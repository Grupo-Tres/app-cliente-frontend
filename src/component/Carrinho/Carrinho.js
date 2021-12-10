import "./carrinho.css";
import Cookies from "universal-cookie";
import { Button } from 'react-bootstrap';
//import ReactDOM from "react-dom";
import React, { useState } from "react";
import Table from 'react-bootstrap/Table'

const cookies = new Cookies();

function Carrinho(dados) {
  //const carrinho = cookies.get('carrinho');
  //const [compras, setCompras] = useState('');

  function esvaziarCarrinho() {
    cookies.remove("carrinho");
    cookies.remove("pedido");
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
    <div className="carrinho">
      <div>Número do pedido: {cookieCarrinho.pedido.numeroPedido}</div>
      <div className="esvaziar" onClick={esvaziarCarrinho}>Esvaziar carrinho</div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Quant</th>
            <th>Nome</th>
            <th>Opção</th>
            <th>Preço</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <React.Fragment>{linha}</React.Fragment>
        </tbody>
      </Table>

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