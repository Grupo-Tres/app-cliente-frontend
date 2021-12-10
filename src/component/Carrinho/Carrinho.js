import "./carrinho.css";
import Cookies from "universal-cookie";
import { Button } from 'react-bootstrap';
import React from "react";
import Table from 'react-bootstrap/Table'

const cookies = new Cookies();

function Carrinho(dados) {

  function esvaziarCarrinho() {
    cookies.remove("carrinho");
    cookies.remove("pedido");
    window.location.reload();
  }

  const finalizarCarrinho = () => {
    window.location.href = '/pedidos';
  }

  const cookieCarrinho = cookies.get("carrinho");

  if (cookieCarrinho === undefined) {
    return (<div className="carrinho">Seu carrinho está vazio</div>)
  }

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
        <td>{element.preco.toFixed(2)}</td>
        <td>{(element.preco * element.quantidade).toFixed(2)}</td>
      </tr>
    );
  });



  return (
    <div className="carrinho">
      <div className="label">Número do pedido: {cookieCarrinho.pedido.numeroPedido}</div>
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
      <div className="esvaziar" onClick={esvaziarCarrinho}>Esvaziar carrinho</div>
      <div className="label">Subtotal: <span className="dado">{subTotal}</span></div>
      <div className="label">Taxa de entrega: <span className="dado">{taxaEntrega}</span></div>
      <div className="label">Total: <span className="dado">{total}</span></div>
      <Button 
              className="btn_finalizar"
              variant="success"
              onClick={finalizarCarrinho} >Finalizar</Button>
    </div>
  );
}

export default Carrinho;
