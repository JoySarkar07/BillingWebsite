import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "../common/Utill.css";
import "./Explore.css";
import ListItem from "../../components/listItem/ListItem";
import ProductView from "../../components/productView/ProductView";
import Cart from "../../components/cart/Cart";
import CartSummary from "../../components/cartSummary/CartSummary";

const Explore = () => {
  const { categories, items, setCartItems, setTotalItem, cartItems } = useContext(AppContext);
  const [onCategorySelect, setOnCategorySelect] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [customerData, setCustomerData] = useState({
    name:"",
    phone:"",
  })

  useEffect(() => {
    setFilteredItem(items);
  }, [items])
  

  useEffect(() => {
    // if(onCategorySelect == "") return;
    const filter = items.filter(item=>item.categoryName.includes(onCategorySelect) && item.name.toLowerCase().includes(searchVal.toLowerCase()));
    setFilteredItem(filter);
  }, [onCategorySelect, searchVal])
  

  const handleCategorySelect = (name)=>{
    setOnCategorySelect(name==="All"?"":name);
  }

  const handleCustomerDataChange = (e)=>{
    const {id, value} = e.target;
    if(id==="phone" && value>9999999999) return;
    setCustomerData(prev=>({
      ...prev,
      [id] : value,
    }))
  }

  const addCartItem = (data) => {
    setTotalItem(price=>price+data.price);
    let itemExists = false;
    setCartItems(prev => {
      const updatedItems = prev.map(item => {
        if (item.itemId === data.itemId) {
          itemExists = true;
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      if (!itemExists) {
        return [
          ...prev,
          {
            itemId: data.itemId,
            name: data.name,
            price: data.price,
            image: data.imgUrl,
            quantity: 1
          }
        ];
      }

      return updatedItems;
    });
  };

  return (
    <div className='item-container text-light'>
      <div className="left-column p-3">
        <div className="category-header">
          <h2>Categories</h2>
          <div className="category-list">
          {
            <ListItem data={{imgUrl:"https://w7.pngwing.com/pngs/14/977/png-transparent-grocery-store-shopping-others-miscellaneous-retail-fast-food-restaurant.png", bgColor:"#010e10",name:"All", items:items.length}} width="300px" onSelect={handleCategorySelect} selectedCategory={onCategorySelect}/>
          }
          {
            categories && categories.length > 0 ? (
              categories.map((category) => (
                <ListItem key={category.categoryId} data={ category } width="300px" onSelect={handleCategorySelect} selectedCategory={onCategorySelect}/>
              ))
            ) : (
              <p>No categories available</p>
            )
          }
          </div>
        </div>
        <hr />
        <div className="product-area">
          <div className="input-group p-1 mb-1">
            <input className="form-control form-control-lg" type="search" placeholder="Search" aria-label="Search" value={searchVal} onChange={(e)=>setSearchVal(e.target.value)}/>
            <i className="bi bi-search btn btn-warning px-4"></i>
          </div>
          <div className="product-list">
            {
              filteredItem && filteredItem.length > 0 ? (
                filteredItem.map((item) => (
                  <ProductView key={item.itemId} data={ item } onAdd={addCartItem}/>
                ))
              ) : (
                <p>No Item available</p>
              )
            }
          </div>
        </div>
      </div>
      <div className="right-column p-3">
        <div className="customer-form">
          <input className="form-control" type="text" placeholder="Customer Name" id="name" value={customerData.name} onChange={handleCustomerDataChange}/>
          <input className="form-control" type="number" placeholder="Customer Phone" max={9999999999} id="phone" value={customerData.phone} onChange={handleCustomerDataChange}/>
        </div>
        <hr />
        <div className="cart-items">
          <Cart />
        </div>
        <hr />
        <div className="cart-summary">
          <CartSummary customerData={customerData} setCustomerData={setCustomerData} items={cartItems}/>
        </div>
      </div>
    </div>
  )
}

export default Explore