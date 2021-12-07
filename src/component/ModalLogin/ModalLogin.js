import React, { useState } from "react";
import { Modal, Form, Row, Col, Nav, Button } from "react-bootstrap";
import "./ModalLogin.css";
import logo2 from "../../assets/pizza.png";
import Cookies from "universal-cookie";
import Homescreen from "../../Screens/Homescreen/Homescreen";
import ReactDOM from "react-dom";

function ModalLogin(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [estiloMensagem, setEstiloMensagem] = useState("");

  const falhaLogin = () => {
    setMensagem("Login inválido. Tente novamente.");
    setEstiloMensagem("msg-login-erro");
    setEmail("");
    setSenha("");
  }

  const okLogin = () => {
    setMensagem("Login realizado com sucesso, aguarde um instante...");
    setEstiloMensagem("msg-login-ok");
    setTimeout(() => {
        props.onHide(); 
        ReactDOM.render(
            <React.StrictMode>
              <Homescreen />
            </React.StrictMode>,
            document.getElementsByClassName("root")[0]
          );
    }, 2000);
  }

  const enviarForm = () => {
    const corpo = {
      email: email,
      senha: senha,
    };

    const cookies = new Cookies();

    fetch("http://localhost:5000/api/v1/login", {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      body: JSON.stringify(corpo),
    })
      .then(function (response) {
        // console.log('Response: ', response);
        if (response.status === 401) {
          console.log("Status: ", response.statusText);
        }
        if (response.status === 404) {
          console.log("Status: ", response.statusText);
        }
        if (response.status === 200) {
          console.log("Status: ", response.statusText);
        }
        return response.json();
      })
      .then(function (data) {
        if (data.status_code === 200) {
          console.log("Logado: ", data);
          cookies.set("token", data.token, { path: "/" });
          console.log(cookies.get("token"));
          console.log("Documento: ", document.cookie);
         
          okLogin();
        }
        else{
            falhaLogin();
        }
        //Para deslogar:
        //cookies.remove('token', { path: '/' });
      });
    
  };

  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-login"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Faça seu Login
          </Modal.Title>
          <img className="logo-modal" alt="" src={logo2} />
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Form className="form-login">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </Form.Group>
              <Nav.Link className="lk-home" href="/cadastro">
                Não é cadastrado? Clique aqui!
              </Nav.Link>
              <div className={estiloMensagem}>{mensagem}</div>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" className="btn-entrar" onClick={enviarForm}>
            Entrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalLogin;
