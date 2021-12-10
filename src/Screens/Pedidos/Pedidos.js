import React, { useEffect, useState } from "react";
import './Pedidos.css';
import Table from 'react-bootstrap/Table'

function Pedidos() {
    return (
        <div className="tabela-pedidos">
            <p>Acompanhe seus pedidos abaixo:</p>
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