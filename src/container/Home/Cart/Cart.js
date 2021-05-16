import classes from './Cart.module.css';
import cartImg from '../../../assets/empty-cart.png'
import { useContext } from 'react';
import MenuContext from '../../../store/menuCtx';
import CourseItem from '../Courses/CourseItem/CourseItem';

const Cart = (props) => {

const menuCtx = useContext(MenuContext);
const cartItems = menuCtx.cartItems;
const cartContext = menuCtx.cartContext
const cartData = cartItems.map((item, i)=>{
    return <CourseItem small={true} key={item.id} id={item.id} name={item.name} price={item.price} count={cartContext[item.id]?cartContext[item.id]:item.count} isVeg={item.isVeg} />
})

const totalItems = cartItems.reduce((prev, item)=>{
    console.log(prev)
    return prev+item.quantity
}, 0)

return(
    <div className={classes.cart}>
        <h4>{cartItems.length==0?'Cart is empty':`Cart has ${totalItems} items`}</h4>
        <p className={classes.text}>Summary</p>
        <div className={classes.content}>
            
            {cartItems.length===0&&<img alt={"empty-cart"} src={cartImg} />}
            {cartItems.length>0&&cartData}
            
        </div>
        <p className={classes.text}>Great food is alway cooking! Go ahead & order some yummy items from the menu</p>
    </div>);
}


export default Cart;