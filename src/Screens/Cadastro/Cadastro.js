import React from 'react';
import './Cadastro.css';
import Cabecalho from "../../component/Cabecalho/Cabecalho";
import {Row, Col, Button, Form} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

// RegEx para validacao de numero telefonico e cep, numero e senha
const phoneRegExp = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
const cepRegExp = /^\d{5}-\d{3}$/
const numRegExp = /^[0-9]*$/
const senhaRegExp = /[a-zA-Z]/

// Schema para o yup
const validationSchema = Yup.object().shape({
  nome: Yup.string()
  .min(2, "*Nomes devem ter ao menos 2 caracteres!")
  .max(100, "*Nomes devem ter menos de 100 caracteres!")
  .required("*Campo nome é obrigatório!"),
  email: Yup.string()
  .email("*Deve ser um endereço de email válido!")
  .max(100, "*O email deve ter menos de 100 caracteres!")
  .required("*Campo Email é obrigatório!"),
  senha: Yup.string()
  .required('Forneça uma senha!') 
  .min(6, 'Senha muito curta - Mínimo de 6 caracteres!')
  .matches(senhaRegExp, 'Senha deve conter apenas letras!'),
  cep: Yup.string()
  .matches(cepRegExp, "*CEP inválido!")
  .required("*O campo CEP é obrigatório!"),
  telefone: Yup.string()
  .matches(phoneRegExp, "*Numero de telefone inválido!")
  .required("*O campo telefone é obrigatório!"),
  numero: Yup.string()
  .required('O campo número é obrigatório!') 
  .matches(numRegExp, 'Número deve conter apenas dígitos!'),
});

// escopo do componente
function Cadastro() {

    // funcao que faz a busca por cep em API e devolve dados do endereco
    function pesquisaCep(ev, setFieldValue) {
        const { value } = ev.target;
        const cep = value?.replace(/[^0-9]/g, '');

        if(cep?.length !== 8){
            return;
        }
    
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                setFieldValue('rua', data.logradouro);
                setFieldValue('bairro', data.bairro);
                setFieldValue('cidade', data.localidade);
                setFieldValue('estado', data.uf);
              });
    };

    return (
      <div>
        <Cabecalho />
        <Formik
          initialValues={{
            nome: "",
            email: "",
            senha: "",
            cep: "",
            rua: "",
            bairro: "",
            cidade: "",
            estado: "",
            numero: "",
            complemento: "",
            telefone: "",
            admin: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            resetForm();
            setSubmitting(false);

            fetch("http://localhost:5000/api/v1/user", {
              method: "POST",
              headers: {
                "Accept": "*/*"
              },
              body: JSON.stringify(values)
            })
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log(data.status)
                if (data.status === "error") {
                    alert(data.msg);
                } else {
                    alert("Cadastro realizado com sucesso!");
                }
                console.log(data);
              });
            setTimeout(() => {
              resetForm();
              setSubmitting(false);
            }, 500);
          }}
        >
          {({
            values,
            isValid,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} className="form-cadastro">
              <h4>Preencha seu cadastro para fazer seus pedidos!</h4>

              <Row className="mb-3">
                <Form.Group
                  className="form-group"
                  as={Col}
                  controlId="formGridName"
                >
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    className={touched.nome && errors.nome ? "error" : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nome}
                    name="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                  />
                  {touched.nome && errors.nome ? (
                    <div className="error-message">{errors.nome}</div>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="form-group"
                  as={Col}
                  controlId="formGridEmail"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className={touched.email && errors.email ? "error" : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    form="novalidatedform"
                    value={values.email}
                    name="email"
                    type="email"
                    placeholder="usuario@dominio.com"
                  />
                  {touched.email && errors.email ? (
                    <div className="error-message">{errors.email}</div>
                  ) : null}
                </Form.Group>

                <Form.Group
                  className="form-group"
                  as={Col}
                  controlId="formGridPassword"
                >
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    className={touched.senha && errors.senha ? "error" : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.senha}
                    name="senha"
                    type="password"
                    placeholder="Apenas letras, mínimo de 6 caracteres"
                  />
                  {touched.senha && errors.senha ? (
                    <div className="error-message">{errors.senha}</div>
                  ) : null}
                </Form.Group>
              </Row>

              <Form.Group
                className="campo-cep form-group"
                as={Col}
                controlId="formGridZip"
              >
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  className={touched.cep && errors.cep ? "error" : null}
                  onChange={handleChange}
                  onBlur={(ev) => pesquisaCep(ev, setFieldValue)}
                  value={values.cep}
                  name="cep"
                  placeholder="Formato: XXXXX-XXX"
                />
                {touched.cep && errors.cep ? (
                  <div className="error-message">{errors.cep}</div>
                ) : null}
              </Form.Group>

              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridAddress1"
                >
                  <Form.Label id="rua">Rua</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rua}
                    name="rua"
                    readOnly
                    placeholder="..."
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridAddress1"
                >
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bairro}
                    name="bairro"
                    readOnly
                    placeholder="..."
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridAddress2"
                >
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cidade}
                    name="cidade"
                    readOnly
                    placeholder="..."
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group
                  className="form-group"
                  as={Col}
                  controlId="formGridCity"
                >
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.estado}
                    name="estado"
                    readOnly
                    placeholder="..."
                  />
                </Form.Group>

                <Form.Group
                  className="form-group"
                  as={Col}
                  controlId="formGridNum"
                >
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    className={touched.numero && errors.numero ? "error" : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.numero}
                    name="numero"
                    placeholder="Número da residência"
                  />
                  {touched.numero && errors.numero ? (
                    <div className="error-message">{errors.numero}</div>
                  ) : null}
                </Form.Group>

                <Form.Group
                  className="form-group"
                  as={Col}
                  controlId="formGridComp"
                >
                  <Form.Label>Complemento</Form.Label>
                  <Form.Control
                    className={
                      touched.complemento && errors.complemento ? "error" : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.complemento}
                    name="complemento"
                    type="text"
                    placeholder="apto, bloco, casa"
                  />
                  {touched.complemento && errors.complemento ? (
                    <div className="error-message">{errors.complemento}</div>
                  ) : null}
                </Form.Group>
                
                <Form.Group
                  className="form-group"
                  as={Col}
                  controlId="formGridTel"
                >
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    className={
                      touched.telefone && errors.telefone ? "error" : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.telefone}
                    name="telefone"
                    type="numeric"
                    placeholder="(11) 99999-9999"
                  />
                  {touched.telefone && errors.telefone ? (
                    <div className="error-message">{errors.telefone}</div>
                  ) : null}
                </Form.Group>
             
              </Row>

              <Button
                className="btn-enviar"
                variant="success"
                type="submit"
                disabled={isSubmitting}
              >
                Enviar
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
}

export default Cadastro;