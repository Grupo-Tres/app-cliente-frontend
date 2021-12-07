import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../assets/logo_corleone.png';
import logo2 from '../../assets/pizza.png';
import ModalLogin from '../ModalLogin/ModalLogin';
import './Cabecalho.css'

function Cabecalho() {
    const [modalShow, setModalShow] = useState(false);

    const mostrarModal = () => {
        setModalShow(true);
    }

    return (
        <div className="shadow p-1 bg-none rounded">
            <Navbar expand="md" bg="light" variant="light">
                <Container fluid>
                    <Navbar.Brand className="nav-bar-1" href="/">
                        <img
                            className="shadow p-1 bg-none rounded"
                            alt=""
                            src={logo}
                            width="100"
                            height="100"
                        />
                        {' '}
                        Pizzaria Don Corleone
                        <img className="logo2"
                            alt=""
                            src={logo2}
                            width="6%"
                            height="6%"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Rua Francis Ford Coppola, 300  
                            <br/>
                            Taxa de Entrega: R$ 6,90
                            <br/>
                            Aberto até 23:59
                        </Navbar.Text>
                      
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Navbar expand="md" bg="light" variant="dark">
                <Container fluid className="nav-bar-2">
                    <Navbar.Brand href="/">Cardápio</Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Nav.Link href="/contato">Contato</Nav.Link>
                        <Nav.Link href="/cadastro">Cadastrar</Nav.Link>
                        <Nav.Link onClick={mostrarModal}>Entrar</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <ModalLogin show={modalShow} onHide={() => setModalShow(false)}></ModalLogin>
        </div>
    )
}

export default Cabecalho;