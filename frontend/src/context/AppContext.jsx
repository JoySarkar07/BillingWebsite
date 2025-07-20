import { createContext, useEffect, useState } from "react";
import { getCategories } from "../service/CategoryService";
import { getItems } from "../service/ItemService";

export const AppContext = createContext(null);

export const AppContextProvider = (props)=>{
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [auth, setAuth] = useState({token:null, role:null});
    const [totalItem, setTotalItem] = useState(0);
    
    useEffect(() => {
      if(! localStorage.getItem("token")) return;
      async function loadData() {
        if(! auth.token){
          setAuthData(localStorage.getItem("token"), localStorage.getItem("role"));
        }
        const categoryResponse = await getCategories();
        const itemResponse = await getItems();
        setCategories(categoryResponse.data);
        setItems(itemResponse.data);
      }
      loadData();
    }, [auth])

    const setAuthData = (token, role)=>{
      setAuth({token, role});
    }

    const clearCart = ()=>{
      setCartItems([]);
      setTotalItem(0);
    }
    
    const contextValue = {
      categories,
      setCategories,
      items,
      setItems,
      setAuthData,
      auth,
      cartItems,
      setCartItems,
      totalItem,
      setTotalItem,
      clearCart
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}
