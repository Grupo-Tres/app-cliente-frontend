import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import logo from '../../assets/logo_corleone.png';
import logo2 from '../../assets/pizza.png';
import ModalLogin from '../ModalLogin/ModalLogin';
import './Cabecalho.css';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import Cookies from "universal-cookie";
import Offcanvas from 'react-bootstrap/Offcanvas'

function Cabecalho() {
    const [modalShow, setModalShow] = useState(false);
    const cookies = new Cookies();

    const token = cookies.get('token');
    console.log(token)

    const logoff = () => {
        cookies.remove('token');
        cookies.remove('Pedido')
        console.log("Removido")
    }

    const mostrarModal = () => {
        setModalShow(true);
    }

    function ToggleOffcanvas({ ...props }) {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        return (
          <>
            <FiShoppingCart onClick={handleShow} className="icon-usuario"/>
      
            <Offcanvas className="offcanvas" show={show} onHide={handleClose} {...props}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Meu Pedido <FiShoppingCart/></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                Inserir logica para criar itens do carrinho de compras
              </Offcanvas.Body>
            </Offcanvas>
          </>
        );
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

            <div>
                {token === undefined ?
                    <Navbar expand="md" bg="light" variant="dark">
                        <Container fluid className="nav-bar-2">
                            <Navbar.Brand href="/">Cardápio</Navbar.Brand>
                            <Nav className="justify-content-end">
                                <Nav.Link href="/contato">Contato</Nav.Link>
                                <Nav.Link href="/cadastro">Cadastrar</Nav.Link>
                                <Nav.Link onClick={mostrarModal}>Entrar</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>    :
                    <Navbar expand="md" bg="light" variant="dark">
                      <Container fluid className="nav-bar-2">
                          <Navbar.Brand href="/">Cardápio</Navbar.Brand>
                          <Nav className="justify-content-end">
                              <Nav.Link href="/contato">Contato</Nav.Link>
                              <Nav.Link href=""><ToggleOffcanvas placement='end' scroll='true'/></Nav.Link>
                                <NavDropdown
                                    title={
                                        <span>
                                            <FiUser className="icon-usuario"/> Opções
                                        </span>
                                    }
                                id='collasible-nav-dropdown'>
                                <NavDropdown.Item href="#action/3.1">Meus Pedidos</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Minha Conta</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/" onClick={logoff}>Sair</NavDropdown.Item>
                              </NavDropdown>
                           </Nav>
                      </Container>
                   </Navbar>
                }
            </div>
           
            <ModalLogin show={modalShow} onHide={() => setModalShow(false)}></ModalLogin>
        </div>
    )
}

export default Cabecalho;