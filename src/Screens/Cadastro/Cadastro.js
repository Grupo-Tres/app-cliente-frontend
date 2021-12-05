import React, { useState } from 'react';
import './Cadastro.css';
import Cabecalho from "../../component/Cabecalho/Cabecalho";
import {Row, Col, Button, Form} from 'react-bootstrap';
import pesquisaCep from '../../component/pesquisaCep/pesquisaCep';

function Cadastro() {
    const [cep, setCep] = useState(0);

    return (
        <div>
            <Cabecalho />
            <Form className="form-cadastro">
                <h4>Preencha seu cadastro para fazer seus pedidos!</h4>
                
                <Row className="mb-3">
                    <Form.Group className="form-group" as={Col} controlId="formGridName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Digite seu nome completo" />
                    </Form.Group>
                    <Form.Group className="form-group" as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu email" />
                    </Form.Group>

                    <Form.Group className="form-group" as={Col} controlId="formGridPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha" />
                    </Form.Group>
                </Row>

                <Form.Group className="campo-cep form-group" as={Col} controlId="formGridZip">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control onBlur={pesquisaCep} placeholder="Digite seu CEP para buscarmos seu endereço"/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3 form-group" controlId="formGridAddress1">
                        <Form.Label id='rua'>Rua</Form.Label>
                        <Form.Control readOnly placeholder="..." />
                    </Form.Group>
                    
                    <Form.Group as={Col} className="mb-3 form-group" controlId="formGridAddress1">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control readOnly placeholder="..." />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 form-group" controlId="formGridAddress2">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control readOnly placeholder="..." />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group className="form-group" as={Col} controlId="formGridCity">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control readOnly placeholder="..."/>
                    </Form.Group>

                    <Form.Group className="form-group" as={Col} controlId="formGridNum">
                        <Form.Label>Número</Form.Label>
                        <Form.Control placeholder="Digite o número de sua residência"/>
                    </Form.Group>

                    <Form.Group className="form-group" as={Col} controlId="formGridTel">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="text" name="phone" placeholder="Digite seu telefone para contato"/>
                    </Form.Group>
                </Row>

                <Button className="btn-enviar" variant="success" type="submit">
                    Enviar
                </Button>
            </Form>

        </div>
    );
}

export default Cadastro;