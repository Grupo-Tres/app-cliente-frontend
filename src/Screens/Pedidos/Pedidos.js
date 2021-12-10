import React, { useEffect, useState } from "react";
import './Pedidos.css';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table'

function Pedidos() {
    // const [linhas, setLinhas] = useState(null);
    const user = 'João';

    // useEffect(() => {
    //     if (linhas === null) {
    //       fetch("http://localhost:5000/api/v1/pedido")
    //         .then(function (resposta) {
    //           const resultado = {
    //             estado: resposta.status,
    //             res: resposta.json(),
    //           };
    //           return resultado;
    //         })
    //         .then(function (respostaFinal) {
    //           if (respostaFinal.estado !== 200) {
    //             respostaFinal.res.then(function (erroResult) {
    //               console.log(erroResult);
    //             });
    //           } else {
    //             respostaFinal.res.then(function (dados) {
    //               gerar_pedidos(dados);
    //             });
    //           }
    //         })
    //         .catch((error) => {
    //           alert(`${error} \n Servidor backend não encontrado`);
    //         });
    //     }
    //   });

    // const gerar_pedidos = (dadosArray) => {
    //     setLinhas(dadosArray.map((pedido) => {
    //         let linha = [];
    //         pedido.forEach((element) => {
    //             linha.push(
    //                 <tr>
    //                     <td>{element.numeroPedido}</td>
    //                     <td>{element.carrinho}</td>
    //                     <td>{element.total}</td>
    //                     <td>{element.comentarios}</td>
    //                     <td>{element.createdAt}</td>
    //                     <td>{element.status}</td>
    //                 </tr>
    //             );
    //         })
    //         return linha;
    //     }));
    // };
       
    return (
        <div className="container">
            <h5>Olá, {user}!</h5>
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