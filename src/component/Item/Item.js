import './Item.css'

function Item(props) {
    return (
        <div className="flex-item shadow p-2 mb-3 bg-white rounded">
            {props.children}
        </div>
    )
}

export default Item;