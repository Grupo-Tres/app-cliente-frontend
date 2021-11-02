import './Item.css'

function Item(props) {
    return (
        <div class="flex-item">
            {props.children}
        </div>
    )
}

export default Item;