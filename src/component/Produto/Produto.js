import './Produto.css'

function Produto(props) {
    return (
        <div class="produto">{props.children}</div>
    )
}

export default Produto;