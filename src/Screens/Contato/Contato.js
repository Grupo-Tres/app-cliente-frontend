import React from 'react';
import './Contato.css';

function Contato() {
    return (
        <div className="contatos">
            <h4>Dúvidas, reclamações ou pedidos por telefone?</h4>
            <br/>
            <h5>Nossos telefones:</h5>
            <p>(11) 3333-3333</p>
            <p>(11) 3333-3334</p>
            <h5>Nosso email comercial:</h5>
            <p>atendimento@pizzacorleone.com.br</p>
            <h5>Nosso endereço:</h5>
            <p>Rua Francis Ford Coppola, 300 - Mooca - São Paulo/SP</p>
            <br/>
            <p>Atendimento: todos os dias da semana, das 18h às 23:59h</p>
        </div>
    );
}

export default Contato;