import classes from './Summary.module.css';
import Button from '../.../../../../components/UI/Button'
import { useContext, useState, useEffect } from 'react';
import MenuContext from '../../../store/menuCtx';
import Loading from '../../../components/UI/Loading';
import Toast from '../../../components/UI/Toast';

const Summary = (props) => {
    
    const [loading, setLoading] = useState(false)
    const menuCtx = useContext(MenuContext)
    const cartItems = menuCtx.cartItems
    const [promo, setPromo] = useState(false)
    const [showToast, setToast] = useState(false)
    const [message, setMessage] = useState('');

    useEffect(()=>{
        if(showToast) {
            setTimeout(()=>{
                setToast(false)
                setMessage('')
            }, 2000)
        }
    }, [showToast])



    let totalCost = cartItems.reduce((prev, item)=>{
        return prev+item.price*item.quantity
    }, 0)

    const applyPromoHandler = () => {
        
        const code = prompt('Enter promo code');
        setLoading(true)
        if(code) {
            if(code==="ilovehoney") {
                setTimeout(()=>{
                    setLoading(false)
                    totalCost=0
                    setPromo(true)
                    setToast(true)
                    setMessage('Applied code')
                }, 2000)
            } else {
                setTimeout(()=>{
                    setLoading(false)
                    setToast(true)
                    setMessage('invalid code')
                }, 2000)
            }
        }
        
    }

return(
    <>
    {loading&&<Loading />}
    <div className={classes.container}>
        <div className={classes.promoCode}>
            <button onClick={applyPromoHandler}>Apply promo code</button>
            
        </div>
        <div className={classes.bill}>
            <h6>Bill Details</h6>
            <div className={classes.row}>
                <p>Item Total</p>
                <p className={!promo?'':classes.strike}><span>&#8377;</span>{promo&&<span className={classes.newPrice}>0</span>}{totalCost}</p>
            </div>

            <div className={classes.row}>
                <p>Delivery Fee</p>
                <p className={!promo?'':classes.strike}><span>&#8377;</span>{promo&&<span className={classes.newPrice}>0</span>}{totalCost*0.1}</p>
            </div>

            <div className={classes.row}>
                <p>Packaging Fee</p>
            
                <p className={!promo?'':classes.strike}><span>&#8377;</span>{promo&&<span className={classes.newPrice}>0</span>}10</p>

            </div>

            <div className={classes.row}>
                <p>Tax & other charges</p>
                <p className={!promo?'':classes.strike}><span>&#8377;</span>{promo&&<span className={classes.newPrice}>0</span>}{(totalCost*0.18).toFixed(2)}</p>
            </div>

            <hr />

            <div className={classes.row}>
                <p className={classes.bold}>To pay</p>
                <p className={!promo?`${classes.bold}`:`${classes.bold} ${classes.strike}`}><span>&#8377;</span>{promo&&<span className={classes.newPrice}>0</span>}{(totalCost*(1+.1+.18)).toFixed(2)}</p>
            </div>
        </div>
        <Button click={()=>{props.orderHandler(totalCost*(1+.1+.18).toFixed(2))}} special={true}>Checkout</Button>
    </div>
    {showToast&&<Toast message={message}/>}
    </>
    );
}


export default Summary;