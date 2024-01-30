import React, { useState } from 'react'
import CartProductCard from './CartProductCard'
import { useDispatch, useSelector } from 'react-redux'
import "./CartPage.css"
import { setCartDiscount, setShipping } from '../../redux/features/cartSlice'
import toast from 'react-hot-toast'



const discountCoupons = [
    {
        code: "SARJIL50",
        discount: 50
    },
    {
        code: "DIS40",
        discount: 40
    },
    {
        code: "DIS60",
        discount: 60
    },
    {
        code: "DIS10",
        discount: 10
    },
]

const CartPage = () => {

    const cartState = useSelector(state => state.cartState)
    const [couponcode, setCouponcode] = useState("")

    const dispatch = useDispatch()
    // console.log(cartState)

    const [total, setTotal] = useState(cartState.total)


    const handleShippingChange = (e) => {
        // setTotal(cartState.total + Number.parseInt(e.target.value))
        dispatch(setShipping({ shipping: Number.parseInt(e.target.value) }))
    }

    const handleApplyDiscountCoupon = (e) => {
        const discountObj = discountCoupons.find((c) => {
            return c.code === couponcode
        })

        if (discountObj) {
            dispatch(setCartDiscount({ discount: discountObj.discount }))
            toast.success("Discount Added")
        } else {
            toast.error("Coupon code not found")
            setTotal(cartState.total)
        }
    }


    return (
        <div className='cartpage'>
            <div className="cpcartitems">
                {cartState.products.map(item => {
                    return <CartProductCard item={item} />
                })}
            </div>
            <div className="cartpagesummarydiv">
                <h3 className="cpsummarytitle">
                    Summary
                </h3>
                <hr />

                <div className="cpstotal">
                    <p className="cpstotalitem">Items {cartState.products.length}</p>
                    <p className="cpstotalamount">₹{(cartState.total).toFixed(2)}</p>

                </div>

                <div className="cpsinputdiv">
                    <label htmlFor="">Shipping</label>
                    <select name="shipping" id="" onChange={(e) => handleShippingChange(e)}>
                        <option value={40}>Normal Time - 40rs</option>
                        <option value={60}>Fast - 60rs</option>
                        <option value={100}>Super Fast - 100rs</option>
                    </select>
                </div>

                <div className="cpsinputdiv">
                    <label htmlFor="">Coupon Code</label>
                    <div className="cpsinputcpndiv">
                        <input type="text" className="cpscoupon" onChange={e => setCouponcode(e.target.value)} />
                        <button className="cpsapplycouponbtn" onClick={(e) => handleApplyDiscountCoupon(e)}>Apply</button>
                    </div>
                    {
                        cartState.discount > 0 ? <p className="cpsdiscountindicatortext">
                            Discount added - {cartState.discount} <button onClick={() => {
                                dispatch(setCartDiscount({ discount: 0 }))
                            }} className='cpsdiscountrmvbtn'>x</button>
                        </p> : ""
                    }
                </div>


                <div className="cpstotal">
                    <p className="cpstotalitem">TOTAL PRICE</p>
                    <p className="cpstotalamount">₹{cartState.total}</p>

                </div>


                <button className="cpscheckout">Checkout</button>

            </div>
        </div>
    )
}

export default CartPage