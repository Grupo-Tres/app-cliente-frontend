import React, { useState, useEffect } from "react";
import './Pedidos.css';
import Table from 'react-bootstrap/Table'
import { Steps } from 'antd';
import 'antd/dist/antd.css';
import Cookies from "universal-cookie";
import { Button } from 'react-bootstrap';

const cookies = new Cookies();

function Pedidos() {
    // usar setStatus(x) com x variando de 0 a 4 para mudar a posicao da timeline
    // mapear 0 a 4 de acordo com o valor recebido do fetch do status
    const [pedido, setPedido] = useState(0)
    const { Step } = Steps;

    //let numPedido = 436; // obter do fetch

    const cookieCarrinho = cookies.get("carrinho");
    const idPedido = cookieCarrinho.pedido.id;


    function atualizaPedido(dados) {
        if (dados.status !== pedido.status){
            setPedido(dados);
           
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
          buscaEstado()
          console.log("Estado: ", pedido.status)
          if (pedido.status === 4){
            clearInterval(interval);
            console.log("Finalizado")
            cookies.remove("carrinho");
            cookies.remove("pedido");
          }
         }, 5000)
         
        return () => clearInterval(interval)
       }, )

    function buscaEstado() {
        fetch("http://localhost:5000/api/v1/pedido/" + idPedido)
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
            
                const acompanhamento = {
                    numeroPedido: dados.numeroPedido,
                    status: dados.status,
                }

                atualizaPedido(acompanhamento);
            });
          }
        })
        .catch((error) => {
          //clearInterval(chamada);
          alert(`${error} \n Servidor backend não encontrado`);
        });
    }

    

    return (
        <div className="tabela-pedidos">
            <h4>Acompanhe seus pedidos abaixo:</h4>
            <h5>Pedido número: {pedido.numeroPedido}</h5>
            <div className="steps-container">
                <Steps direction="vertical" current={pedido.status}>
                    <Step title="Realizado" description="Seu pedido foi enviado. Aguarde, por favor." />
                    <Step title="Aceito" description="Seu pedido foi aceito." />
                    <Step title="Preparando" description="Seu pedido está sendo preparado." />
                    <Step title="Saiu para Entrega" description="Seu pedido saiu para entrega." />
                    <Step title="Finalizado" description="Seu pedido foi entregue e finalizado." />
                </Steps>
                <Button className="btn-cancelar" onClick={null} disabled={false} variant="danger">Cancelar Pedido</Button>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Número do Pedido</th>
                        <th>Itens</th>
                        <th>Total</th>
                        <th>Comentários</th>
                        <th>Realizado em</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <React.Fragment>{linhas}</React.Fragment> */}
                </tbody>
            </Table>
            <p></p>
        </div>
    );
}

export default Pedidos;