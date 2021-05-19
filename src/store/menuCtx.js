import React, {useState} from 'react';


const MenuContext = React.createContext({
    menu:{},
    categories:[],
    setMenuHandler: (menu) => {},
    selectedItem: -1,
    cartItems:[],
    setCartItems: (item) => {},
    selectedItemhandler: (id) => {},
    editCartItems: (id) => {},
    cartContext:{},
    clearCart: () => {}
})





export const MenuContextProvider = (props) => {

    const [selectedItem, setSelectedItem] = useState(Number(0));
    const [menu, setMenu] = useState({});
    const [categories, setCategories] = useState([]);
    const [cartContext, setCartContext] = useState({})
    const [cartItems, setCartItems] = useState([]);

    const setMenuHandler = (menu) => {
        setMenu(menu);
        setCategories(Object.keys(menu))
        let obj = {};
        const c = Object.keys(menu)
        // console.log(c)
        c.forEach((key, j)=>{

            for(var i=0; i<menu[key].length; i++) {
                obj[`${menu[key][i].id}`] = 0;
            }

            
            
            if(j===c.length-1) {
                if((Object.keys(cartContext).length===0))
                    setCartContext(obj);
            }
        })
        
    }

    const selectedItemhandler = (id) => {
        setSelectedItem(id)
    }

    const setCartItemsHandler = (item) => {
        // console.log("setCartItemsHandler")
        setCartItems((prevState)=>{
            return [...prevState, item]
        })

        setCartContext((prev)=>{
            
            return {...prev, [`${item.id}`]:item.quantity}
        })
    }
    
   
    

    const editCartItemsHandler = (count, idx, id) => {
            // console.log("Updating ", count)
            setCartItems((prev)=>{
                let cartItems = [...prev];
                if(count===0) {
                    // console.log("Count was 0")
                    cartItems.splice(idx, 1)
                    return cartItems
                } else {
                    // console.log("Count was not 0")

                    cartItems[idx].quantity = count
                return cartItems
                }
                
                
            })

            setCartContext((prev)=>{
            return {...prev, [`${id}`]:count}
            })
        
    }
    const clearCartHandler = () => {
        setCartItems([]);
        let obj = {};
        const c = Object.keys(menu)
        // console.log(c)
        c.forEach((key, j)=>{

            for(var i=0; i<menu[key].length; i++) {
                obj[`${menu[key][i].id}`] = 0;
            }

            
            
            if(j===c.length-1) {
                if((Object.keys(cartContext).length===0))
                    setCartContext(obj);
            }
        })
    }
    const contextValue = {
        menu:menu,
        categories:categories,
        setMenuHandler: setMenuHandler,
        selectedItemhandler:selectedItemhandler,
        selectedItem:selectedItem,
        cartItems: cartItems,
        setCartItems:setCartItemsHandler,
        editCartItems:editCartItemsHandler,
        cartContext:cartContext,
        clearCart: clearCartHandler
    }
    
    return (<MenuContext.Provider value={contextValue}>
        {props.children}
    </MenuContext.Provider>)

}


export default MenuContext;