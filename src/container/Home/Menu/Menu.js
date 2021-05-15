import classes from './Menu.module.css';


import { useContext, useState } from "react";
import MenuContext from "../../../store/menuCtx";


const Menu = (props) => {
    const menuCtx = useContext(MenuContext);
    

    const clickHandler = (event) => {
        menuCtx.selectedItemhandler(Number(event.target.id))
    }
    const categories = menuCtx.categories.map((item, i)=>{
        return (<li key={i} id={i} onClick={clickHandler} className={i===menuCtx.selectedItem?classes.active:''}>{item}</li>)
    });
    return(
        <div className={classes.menu}>
            <h4>Menu</h4>
            <ul>
                {categories} 
            </ul>
        </div>
    );
}


export default Menu;