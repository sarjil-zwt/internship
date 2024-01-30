import React, { useEffect, useState } from 'react'
import "./CartProductCard.css"
import { useDispatch } from 'react-redux'
import { removeFromCart, setQuantityOfCartProduct } from '../../redux/features/cartSlice'
import { Link } from 'react-router-dom'

const CartProductCard = ({ item }) => {

    const [quantity, setQuantity] = useState(item.quantity)
    const dispatch = useDispatch()

    useEffect(() => {
        handleChange()
    }, [quantity])

    const handleChange = () => {
        dispatch(setQuantityOfCartProduct({ id: item.product.id, quantity }))
    }


    const handleDelete = () => {
        dispatch(removeFromCart({ id: item.product.id }))
    }


    return (
        <div className='cartcard'>

            <img src={item.product.image} className='ccimage' alt="" />

            <div className="ccdetails">
                <Link to={`/product/${item.product.id}`} >
                    <p className="title">{item.product.title}</p>
                </Link>
                <p className="ccprice">
                    ₹{item.product.price}
                </p>
            </div>

            <div className="ccbuttons">
                <button className="ccdecbtn" onClick={(e) => setQuantity(q => q - 1)}>-</button>
                <input type="number" className='ccquantityinp' value={quantity} onChange={(e) => setQuantity(e.target.value)} id="" />
                <button className="ccincbtn" onClick={(e) => setQuantity(q => q + 1)}>+</button>
            </div>

            <button onClick={handleDelete} className='ccrmvbtn'>x</button>


        </div>
    )
}

export default CartProductCard