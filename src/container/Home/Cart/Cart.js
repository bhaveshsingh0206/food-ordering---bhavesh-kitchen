import classes from './Cart.module.css';
import cartImg from '../../../assets/empty-cart.png'
import { useContext } from 'react';
import MenuContext from '../../../store/menuCtx';
import CourseItem from '../Courses/CourseItem/CourseItem';
import Button from '../../../components/UI/Button'
import { useHistory } from 'react-router';


const Cart = (props) => {
const history = useHistory();
const menuCtx = useContext(MenuContext);
const cartItems = menuCtx.cartItems;
const cartContext = menuCtx.cartContext
const cartData = cartItems.map((item, i)=>{
    return <CourseItem small={true} key={item.id} id={item.id} name={item.name} price={item.price} count={cartContext[item.id]?cartContext[item.id]:item.count} isVeg={item.isVeg} />
})
const amount = cartItems.reduce((prev, item)=>{
    return prev+item.price*item.quantity
}, 0)
const totalItems = cartItems.reduce((prev, item)=>{
    console.log(prev)
    return prev+item.quantity
}, 0)


const cartHandler = () => {
    history.push('/cart')
}

return(
    <div className={classes.cart}>
        <h4>{cartItems.length===0?'Cart is empty':`Cart has ${totalItems} items`}</h4>
        {/* <p className={classes.summary}>Summary of items included</p> */}
        <div className={classes.content}>
            
            {cartItems.length===0&&<img alt={"empty-cart"} src={cartImg} />}
            {cartItems.length>0&&cartData}
            
        </div>
        {cartItems.length!==0&&!props.show&&<div className={classes.checkout}>
            <h3>Item Total <span>&#8377;{amount}</span></h3>
            <p className={classes.text}>Extra charges may apply</p>
            <Button click={cartHandler} special={true}>Checkout</Button>
            </div>}
        <p className={classes.text}>Great food is alway cooking! Go ahead & order some yummy items from the menu</p>
    </div>);
}


export default Cart;