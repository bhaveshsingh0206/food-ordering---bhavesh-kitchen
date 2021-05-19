import classes from './Menu.module.css';


import { useContext } from "react";
import MenuContext from "../../../store/menuCtx";


const Menu = (props) => {
    const menuCtx = useContext(MenuContext);
    

    const clickHandler = (event) => {
        
        
        menuCtx.selectedItemhandler(Number(event.target.attributes.i.value))
        
    }
    const categories = menuCtx.categories.map((item, i)=>{
        return (<li key={i}><a onClick={clickHandler} i={i} href={`#${item}`} className={i===menuCtx.selectedItem?classes.active:''}>{item}</a></li>)
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