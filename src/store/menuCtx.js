import React, {useState} from 'react';


const MenuContext = React.createContext({
    menu:{},
    categories:[],
    setMenuHandler: (menu) => {},
    selectedItem: -1,
    selectedItemhandler: (id) => {}
})

export const MenuContextProvider = (props) => {

    const [selectedItem, setSelectedItem] = useState(Number(0));
    const [menu, setMenu] = useState({});
    const [categories, setCategories] = useState([]);

    const setMenuHandler = (menu) => {
        setMenu(menu);
        setCategories(Object.keys(menu))
    }

    const selectedItemhandler = (id) => {
        setSelectedItem(id)
    }


    const contextValue = {
        menu:menu,
        categories:categories,
        setMenuHandler: setMenuHandler,
        selectedItemhandler:selectedItemhandler,
        selectedItem:selectedItem
    }
    
    return (<MenuContext.Provider value={contextValue}>
        {props.children}
    </MenuContext.Provider>)

}


export default MenuContext;