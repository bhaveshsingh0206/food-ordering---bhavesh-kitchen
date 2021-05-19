import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuContext from '../../store/menuCtx';
import Cart from '../Home/Cart/Cart';
import classes from './CartPage.module.css';
import Summary from './SummaryAmount/Summary';
import cartImage from '../../assets/empty.png'
import Input from '../../components/UI/Input';
import FloatingButton from '../../components/UI/FloatingButton'

import { AUTH, DATABASE, GOOGLEAPI } from '../../utils/API';
import { WEB_KEY, GOOGLE_KEY } from '../../utils/Constants';
import AuthContext from '../../store/authCtx';
import Toast from '../../components/UI/Toast';
import Loading from '../../components/UI/Loading';

const CartPage = (props) => {
    const menuCtx = useContext(MenuContext)
    const authCtx = useContext(AuthContext)
  
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [userKey, setUserKey] = useState("");
    const [onClick, setOnClick] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const onMobileChangeHandler = (event) => {
        setMobileNumber(event.target.value)
    }

    const onNameChangehandler = (event) => {
        setName(event.target.value)
    }
    const onAddressChangehandler = (event) => {
        setAddress(event.target.value)
    }

     function onGetApi() {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(
            async function(position) {
                
              const lat = position.coords.latitude
              const long = position.coords.longitude
              
                try{
                    
                    let res = await GOOGLEAPI.get(`/json?latlng=${lat},${long}&key=${GOOGLE_KEY}`)
                    res = res.data
                    if(res.results.length>0) {
                        res = res.results[0]
                        setAddress(res.formatted_address)
                        setOnClick(true)
                        setLoading(false)
                        setError(true)
                
                        setErrorMessage('Address located')
                    } else {
                        setLoading(false)
                        setError(true)
                
                        setErrorMessage('Some error occured while communicating with the server')
                        setAddress("")
                    }
                } catch(error) {
                    setLoading(false)
                    setError(true)
                
                    setErrorMessage('Some error occured while communicating with the server')
                }
              
            },
            function(error) {
                setError(true)
                setErrorMessage('Please provide acces to location')
               
              setLoading(false)
            }
        );
        setLoading(false)
    }
    useEffect(() => {
        if (error) {
          setTimeout(() => {
            setError(false);
            setErrorMessage("");
          }, 2000);
        }
      }, [error]);

    async function orderHandler(finalAmount) {
       
        
        if(address===""||name===""||mobileNumber==="") {
            
            setError(true)
            setErrorMessage('Please fill in all the details')
            return;
        }
        if(userKey==="") {
            setError(true)
            setErrorMessage('Some error occured while communicating with the server')
            return
        }
        setLoading(true)
        
        setError(false)
        setError('')
        // 
        try{
            const res = await DATABASE.post(`/users/${userKey}/orders.json?auth=${authCtx.token}`,{ items:[...menuCtx.cartItems],ordedDate:Date().toString(), address:address, totalCost:finalAmount})
            
            history.push('/orders')
            menuCtx.clearCart();

            
        } catch(e) {
            setLoading(false)
            setError(true)
            setErrorMessage('Some error occured while communicating with the server')
        }
        
    }

    useEffect(()=>{
        async function getData() {
            try{
                setLoading(true)
                const res = await AUTH.post(`/accounts:lookup?key=${WEB_KEY}`,{idToken: authCtx.token})
                let data = await res.data
                const userID = data.users[0].localId
                
                const userData = await DATABASE.get(`/users.json?auth=${authCtx.token}&orderBy="uid"&startAt="${userID}"&endAt="${userID}"`)
                data = await userData.data
                const datakeys = Object.keys(data)
                data = data[datakeys[0]]
                setUserKey(userID)
                
                
                setMobileNumber("+91"+data.phoneNumber)
                setName(data.name)
                setLoading(false)
            } catch(error) {
                setLoading(false)
                setError(true)
                
                setErrorMessage('Some error occured while communicating with the server')
            }
            
        }
        getData()
    }, [])

    return(
        <>
        {loading&&<Loading />}
        <div className={classes.container}>
            <div className={classes.left}>
                {/* <button onClick={backHandler} className={classes.back}>Back to menu</button> */}
                <div className={classes.details}>
                <h2>Your Details</h2>
                <div className={classes.row}>
                    <Input change={onNameChangehandler} value={name} label={"Name"} id={"1"}/>
                    <Input change={onMobileChangeHandler} disabled={true} value={mobileNumber}  label={"Mobile Number"} id={"2"}/>
                    
                </div>
                <Input btn={!onClick} btnText="auto detect?" click={onGetApi} value={address} change={onAddressChangehandler} label={"Address"} id={"3"}/>
                
                </div>
                <div className={classes.summary}>
                    <h2>Summary of items bought</h2>
                    {menuCtx.cartItems.length===0&&<p className={classes.text}>No items added to cart</p>}
                    {menuCtx.cartItems.length>0&&<Cart show={true} />}
                </div>
                
            </div>
            <div className={classes.right}>
                {menuCtx.cartItems.length!==0&&<Summary orderHandler={orderHandler} />}
                {menuCtx.cartItems.length===0&&<div className={classes.noData}>
                    <img alt="No data" src={cartImage}/>
                    <p className={classes.no}>No items added</p>
                </div>}
            </div>
        </div>
        {error&&<Toast message={errorMessage} />}
        <FloatingButton home orders />
    </>);
}


export default CartPage;