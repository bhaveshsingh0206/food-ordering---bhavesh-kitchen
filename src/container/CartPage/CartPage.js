import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuContext from '../../store/menuCtx';
import Cart from '../Home/Cart/Cart';
import classes from './CartPage.module.css';
import Summary from './SummaryAmount/Summary';
import cartImage from '../../assets/empty.png'
import Input from '../../components/UI/Input';

import { AUTH, DATABASE } from '../../utils/API';
import { WEB_KEY } from '../../utils/Constants';
import AuthContext from '../../store/authCtx';

const CartPage = (props) => {
    const menuCtx = useContext(MenuContext)
    const authCtx = useContext(AuthContext)
    const history = useHistory()
    const backHandler = () => {
        history.push('/')
    }

    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    const onMobileChangeHandler = (event) => {
        setMobileNumber(event.target.value)
    }

    const onNameChangehandler = (event) => {
        setName(event.target.value)
    }

    useEffect(()=>{
        async function getData() {
            try{
                const res = await AUTH.post(`/accounts:lookup?key=${WEB_KEY}`,{idToken: authCtx.token})
                let data = await res.data
                const userID = data.users[0].localId
                console.log(userID)
                const userData = await DATABASE.get(`/users.json?auth=${authCtx.token}&orderBy="uid"&startAt="${userID}"&endAt="${userID}"`)
                data = await userData.data
                const datakeys = Object.keys(data)
                data = data[datakeys[0]]
                console.log(data)
                setMobileNumber("+91"+data.phoneNumber)
                setName(data.name)
            } catch(error) {
                console.log(error)
            }
            
        }
        getData()
    }, [])

    return(
        <div className={classes.container}>
            <div className={classes.left}>
                <button onClick={backHandler} className={classes.back}>Back to menu</button>
                <div className={classes.details}>
                <h2>Your Details</h2>
                <div className={classes.row}>
                    <Input change={onNameChangehandler} value={name} onCh  label={"Name"} id={"1"}/>
                    <Input change={onMobileChangeHandler} disabled={true} value={mobileNumber}  label={"Mobile Number"} id={"2"}/>
                </div>
                </div>
                <div className={classes.summary}>
                    <h2>Summary of items bought</h2>
                    {menuCtx.cartItems.length===0&&<p className={classes.text}>No items added to cart</p>}
                    {menuCtx.cartItems.length>0&&<Cart show={true} />}
                </div>
                
            </div>
            <div className={classes.right}>
                {menuCtx.cartItems.length!==0&&<Summary />}
                {menuCtx.cartItems.length===0&&<div className={classes.noData}>
                    <img alt="No data" src={cartImage}/>
                    <p className={classes.no}>No items added</p>
                </div>}
            </div>
        </div>);
}


export default CartPage;