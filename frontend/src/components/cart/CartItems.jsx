import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const CartItems = ({
    item
}) => {
    const { setCartItems, setTotalItem } = useContext(AppContext);
    const decrement = (id)=>{
        setCartItems(prev=>prev.map(item=>{
            setTotalItem(price=>price-item.price);
            if(item.id==id){
                return {
                    ...item,
                    quantity : item.quantity - 1,
                }
            }
            return item;
        }))
    }

    const increment = (id)=>{
        setCartItems(prev=>prev.map(item=>{
            if(item.id==id){
                setTotalItem( price=> price + item.price );
                return {
                    ...item,
                    quantity : item.quantity + 1,
                }
            }
            return item;
        }))
    }

    const removeItem = (id)=>{
        let deletedPrice = 0;
        setCartItems(prev=>prev.filter(item=>{
            deletedPrice = item.price;
            return item.id!==id
        }));
        setTotalItem(price=>price-deletedPrice);
    }
  return (
    <div 
        className="list-group-item fw-light d-flex justify-content-between align-items-center p-3 rounded-3 shadow-sm bg-opacity-10"
        style={{ backgroundColor: '#010e10ff' }}
        >
        <img 
          src={ item.image } 
          alt={ item.name } 
          className="img-thumbnail rounded-circle border-white shadow me-3"
          style={{ width: '64px', height: '64px', objectFit: 'cover' }}
          />
        <div className="flex-grow-1">
            <div className='d-flex justify-content-between align-items-center'>
                <h5 className="mb-1 fw-semibold">{item.name}</h5>
                <span className="fw-bold"><i className="bi bi-currency-rupee"></i>{item.price*item.quantity}</span>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex gap-1 justify-content-center align-items-center'>
                    <button className='bg-danger rounded-2' onClick={()=>decrement(item.id)} disabled={item.quantity===1}>
                        <i className="bi bi-dash"></i>
                    </button>
                    <p className='text-center' style={{margin:0, width:"30px"}}>{item.quantity}</p>
                    <button className='bg-info rounded-2' onClick={()=>increment(item.id)}>
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
                <button className='bg-danger rounded-2' onClick={()=>removeItem(item.id)}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    </div>
  )
}

export default CartItems