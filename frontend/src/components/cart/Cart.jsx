import React, { useContext } from 'react'
import CartItems from './CartItems'
import { AppContext } from '../../context/AppContext'

const Cart = () => {
    const { cartItems } = useContext(AppContext);
    return (
        <div className='h-100 d-flex flex-column gap-1 overflow-y-auto'>
            {
                cartItems && cartItems.length > 0 && cartItems.map(item=>{
                    return <CartItems key={item.itemId} item={item}/>
                })
            }
            {
                cartItems && cartItems.length==0 && <p>No Item In Cart</p>
            }
        </div>
    )
}

export default Cart