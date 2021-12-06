import React from "react";
import { Modal, Form, Row, Col, Nav, Button } from 'react-bootstrap';
import "./ModalLogin.css";
import logo2 from '../../assets/pizza.png';

function ModalLogin(props) {
    return (
        <div>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-login">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Faça seu Login
                    </Modal.Title>
                    <img className="logo-modal"
                        alt=""
                        src={logo2}
                    />
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form  className="form-login">

                        <Row className="mb-3">
                            <Form.Group
                                className="form-group"
                                as={Col}
                                controlId="formGridEmail"
                            >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    form="novalidatedform"
                                    name="email"
                                    type="email"
                                    placeholder="Informe seu email"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group
                                className="form-group"
                                as={Col}
                                controlId="formGridPassword"
                            >
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    name="senha"
                                    type="password"
                                    placeholder="Informe sua senha"
                                />
                            </Form.Group>
                            <Nav.Link className="lk-home" href="/cadastro">Não é cadastrado? Clique aqui!</Nav.Link>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" className="btn-entrar" onClick={props.onHide}>Entrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalLogin;