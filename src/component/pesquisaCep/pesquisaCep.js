function pesquisaCep(ev) {
    const { value } = ev.target;
    const cep = value?.replace(/[^0-9]g/, ''); 

    if(cep?.length !== 8){
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => console.log(data));
};

export default pesquisaCep;