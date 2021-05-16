import classes from './CourseItem.module.css';
import { useContext, useEffect, useState } from 'react';
import MenuContext from '../../../../store/menuCtx';
import vegIcon from '../../../../assets/veg.png';
import nonvegIcon from '../../../../assets/nonveg.png';

const CourseItem = (props) => {

    const menuCtx = useContext(MenuContext);
    // const [active, setActive] = useState(Number(menuCtx.cartContext[`${props.id}`])===0)
    let count = Number(menuCtx.cartContext[`${props.id}`])
    
    const activeHandler = () => {
        count=count+1;
        update()
           
    }

    const update = () => {
        if(count<0) return
    
        else {
            let cartItems = menuCtx.cartItems;
            let idx = -1
            for(var i=0;i<cartItems.length;i++) {
                let item = cartItems[i];
                if(item.id===props.id) {
                    idx=i;
                    break;
                }
            }
            if(idx!==-1) {
                
                menuCtx.editCartItems(count, idx, props.id)

            } else {
                
                if(count>0) {
                    
                
                    let obj = {
                        id:props.id,
                        name:props.name,
                        price:props.price,
                        quantity: count,
                        isVeg: props.isVeg
                    }

                    menuCtx.setCartItems(obj);
                }
            }
        }
    }

    const subHandler = () => {
        // if(count===1) setActive(true)
        count = count-1;
        update()   
    }

    const addHandler = () => {
        count=count+1;
        update()
    }

    return(<div className={!props.small?classes.itemCard:classes.itemCardSmall}>
        <span className={`${classes.circle}`}><img alt={props.isVeg?'vegIcon':'nonvegIcon'} src={props.isVeg?vegIcon:nonvegIcon} /></span>
        <h5>{props.name}</h5>
        <div className={classes.controls}>
            <span className={classes.amount}>&#8377; {props.price}</span>
            <span className={classes.controlBtns}>
                {Number(menuCtx.cartContext[`${props.id}`])!==0&&<span><button disabled={Number(menuCtx.cartContext[`${props.id}`])===0} onClick={subHandler}>-</button><span className={classes.count}>{menuCtx.cartContext[`${props.id}`]}</span><button onClick={addHandler}>+</button></span>}
                {Number(menuCtx.cartContext[`${props.id}`])===0&&<button  onClick={activeHandler} className={classes.add}>Add</button>}
            </span>
        </div>
    </div>);
}


export default CourseItem;