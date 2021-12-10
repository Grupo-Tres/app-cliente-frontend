import React, { useState } from "react";
import './Pedidos.css';
import Table from 'react-bootstrap/Table'
import { Steps } from 'antd';
import 'antd/dist/antd.css';

function Pedidos() {
    // usar setStatus(x) com x variando de 0 a 4 para mudar a posicao da timeline
    // mapear 0 a 4 de acordo com o valor recebido do fetch do status
    const [status, setStatus] = useState(0)
    const { Step } = Steps;

    let numPedido = 436; // obter do fetch

    return (
        <div className="tabela-pedidos">
            <h4>Acompanhe seus pedidos abaixo:</h4>
            <h5>Pedido número: {numPedido}</h5>
            <div className="steps-container">
                <Steps direction="vertical" current={status}>
                    <Step title="Realizado" description="Seu pedido foi enviado. Aguarde, por favor." />
                    <Step title="Aceito" description="Seu pedido foi aceito." />
                    <Step title="Preparando" description="Seu pedido está sendo preparado." />
                    <Step title="Saiu para Entrega" description="Seu pedido saiu para entrega." />
                    <Step title="Finalizado" description="Seu pedido foi entregue e finalizado." />
                    
                </Steps>
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