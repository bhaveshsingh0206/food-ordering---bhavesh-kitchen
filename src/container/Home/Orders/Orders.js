import classes from './Order.module.css';
import vegIcon from '../../../assets/veg.png';
import nonvegIcon from '../../../assets/nonveg.png';
import FloatingButton from '../../../components/UI/FloatingButton';
import { useEffect, useState, useContext } from 'react';
import thankImg from '../../../assets/thank.png'
import {DATABASE, AUTH} from '../../../utils/API'
import AuthContext from '../.../../../../store/authCtx'
import {WEB_KEY} from '../../../utils/Constants'
import Toast from '../../../components/UI/Toast';
import Loading from '../../../components/UI/Loading';


const Orders = (props) => {
    const [orders, setOrders] = useState([])
    const authCtx = useContext(AuthContext)
    const [showToast, setToast] = useState(false)
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        if(showToast) {
            setTimeout(()=>{
                setToast(false)
                setMessage('')
            }, 2000)
        }
    }, [showToast])
    
    useEffect(()=>{
        async function getData() {
            setLoading(true)
            try{
                const res = await AUTH.post(`/accounts:lookup?key=${WEB_KEY}`,{idToken: authCtx.token})
                let data = await res.data
                const userID = data.users[0].localId
                // 
                const userData = await DATABASE.get(`/users.json?auth=${authCtx.token}&orderBy="uid"&startAt="${userID}"&endAt="${userID}"`)
                data = await userData.data
                const datakeys = Object.keys(data)
                data = data[datakeys[0]]
                // 
                const ords = data.orders
                if(ords) {
                    const orderiD = Object.keys(ords)
                    orderiD.reverse()
                    const data = orderiD.map((id)=>{
                        const order = ords[id];
                        // 
                        let items = order.items.map((item, i)=>{
                            
                            return `${item.quantity} x ${item.name}${i==order.items.length-1?'':', '}`
                        })


                        

                        return (<div key={id} className={classes.card}>
                        <div className={classes.upper}>
                            <div className={classes.row}><h4>Bhavesh's Kitchen</h4><span className={classes.red}>&#8377;{order.totalCost.toFixed(2)}</span></div>
                            <p>Mira Road, Mumbai</p>
                        </div>
                        <div className={classes.lower}>
                            <span className={classes.delivered}>Delivered</span>
                            <p className={classes.categories}>Items</p>
                            <p>{items}</p>
        
                            <p className={classes.categories}>Ordered on</p>
                            <p>{order.ordedDate}</p>
                            
                        </div>
                    </div>)
                       
                    })
                    setOrders(data)
                    setLoading(false)
                    
                }
                setLoading(false)
            
            } catch(error) {
                // 
                setToast(true)
                setLoading(false)
                setMessage('Some error occured while communicating with the server')
            }
            
        }
        getData()
    }, [])

    

return(
    <>
    {loading&&<Loading/>}
    <div className={classes.containter}>
        <div className={classes.centre}>
            <h2>Placed Orders</h2>
            {orders.length!==0&&<div className={classes.box}>{orders} </div>}
            
            {orders.length===0&&<p className={classes.noData}>Order Now - Delicious food right at your doorsteps!!</p>}
        </div>
        <div className={classes.right}><img alt="thank" src={thankImg}/></div>
    </div>
        <FloatingButton home cart/>
        {showToast&&<Toast message={message} />}
    </>
    );
}


export default Orders;