import React, { useState } from "react";
import { Modal, Form, CloseButton, Button } from 'react-bootstrap';
import "./Produto.css";

function Produto(produto) {
  const [quantidade, setQuantidade] = useState(1);
  const [opcaoIndex, setOpcaoIndex] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function click() {
    console.log('Selecionado: ', {
      produtoId: produto.children.id,
      opcao: opcaoIndex,
      quantidade: quantidade,
      valorTotal: produto.children.opcoes[opcaoIndex].preco * quantidade
    });
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
          <div className="lb-opcao">Tamanho</div>
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

      <Modal show={show}>
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
