import React, { useState } from "react";
import { Modal, Form, CloseButton, Button } from 'react-bootstrap';
import "./Produto.css";
import Cookies from "universal-cookie";
import { notification } from 'antd';
import 'antd/dist/antd.css'

function Produto(produto) {
  const [quantidade, setQuantidade] = useState(1);
  const [opcaoIndex, setOpcaoIndex] = useState(0);

  const [show, setShow] = useState(false);
  const [pedidoPendente, setPedido] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cookies = new Cookies();

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'IMPORTANTE!',
      description:
        'Faça seu login para adicionar itens ao carrinho.',
    });
  };

  function click() {
    const token = cookies.get("token")
    const cookiePegoPedido = cookies.get("pedido")
console.log("cookiePegoPedido: ", cookiePegoPedido)
    if (cookiePegoPedido) {
      cookiePegoPedido.forEach(element => {
        if (element.status === "Pendente") {
          setPedido(element)
        }
      });
    }


    if (token) {

       const corpo = {
        token: token,
        idPedido: cookiePegoPedido, 
        produtoId: produto.children.id,
        nome: produto.children.nome,
        opcao: produto.children.opcoes[opcaoIndex].opcao,
        quantidade: quantidade,
        preco: produto.children.opcoes[opcaoIndex].preco
      }
console.log("Corpo do pedido: ", pedidoPendente.id)

        fetch("http://localhost:5000/api/v1/addcarrinho", {
          method: "POST",
          headers: {
            "Accept": "*/*"
          },
          body: JSON.stringify(corpo),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (!cookiePegoPedido) {
              const novoCookie = [{
                id: data.pedido.id,
                status: data.pedido.status,
              }]
              console.log("Novo cookie: ", novoCookie)
              cookies.set("pedido", novoCookie, { path: "/" });
              setPedido(novoCookie)
            } 
            console.log("Dados do Carrinho: ", data)
            cookies.set("carrinho", data, { path: "/" });
            return data;
          })
          .catch(function (error) {
            console.log(error);
          });
        //cookies.set("numeroPedido", Math.random() * 100, { path: "/" });
    } else {
      openNotificationWithIcon('error');
    }
    
  }

  return (
    <div className="container shadow p-2 bg-white rounded">
      <div className="produto_titulo">{produto.children.nome.toUpperCase()}</div>
      <div className="produto_detalhes">
        <div onClick={handleShow} className="sec-1">
          <img className="produto_imagem" alt="" src={produto.children.foto} />
          <span>Clique na imagem</span>
        </div>
        <div className="sec-2">
          <div className="lb-opcao">Opção</div>
          <div className="lb-quantidade">Quantidade</div>
        </div>
        <div className="sec-3">
          <div className="combo-opcao">
            <Form.Select
              size="sm"
              className="sel-tamanho"
              value={opcaoIndex}
              onChange={(e) => {
                setOpcaoIndex(parseInt(e.target.value));
              }}
            >
              {produto.children.opcoes.map((item, indice) => {
                return <option value={indice}>{item.opcao}</option>;
              })}
            </Form.Select>
          </div>
          <div className="contador-quantidade">
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
          <div className="preco">
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
          <div className="botao-adicionar">
            <Button 
              className="btn-add-carrinho"
              variant="success"
              onClick={click} >Adicionar</Button>
          </div>
        </div>
      </div>

      <Modal show={show} dialogClassName="meu-modal">
        <Modal.Header>
          <Modal.Title>{produto.children.nome.toUpperCase()}</Modal.Title>
          <CloseButton onClick={handleClose}/>
        </Modal.Header>

        <Modal.Body>
          <img src={produto.children.foto} className="img-modal" style={{ height: '10% !important' }}></img>
          <p>{produto.children.descricao}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn-add-carrinho" variant="success" onClick={handleClose}>Fechar</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Produto;
