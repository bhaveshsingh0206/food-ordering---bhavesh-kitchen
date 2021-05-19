import classes from './Home.module.css';
import Menu from './Menu/Menu';
import MenuContext from '../../store/menuCtx'
import { useContext, useEffect, useState } from 'react';
import {DATABASE} from '../../utils/API'
import AuthContext from '../../store/authCtx';
import Courses from './Courses/Courses';
import Cart from './Cart/Cart';
import FloatingButton from '../../components/UI/FloatingButton';
import Toast from '../../components/UI/Toast';
import Loading from '../../components/UI/Loading';
const Home = (props) => {

    const menuCtx = useContext(MenuContext);
    const authCtx = useContext(AuthContext);
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
        setLoading(true)
        async function fetchData() {
            try{
                const res = await DATABASE.get(`/menu.json?auth=${authCtx.token}`)
                const data = await res.data
                menuCtx.setMenuHandler(data)
                setLoading(false)
            } catch(error) {
                
                setLoading(false)
                setMessage('Some error occured while communicating with the server')
                setToast(true)
            }
        }
        fetchData();
        
    }, [authCtx.token])

    return(
        <>
        {loading&&<Loading />}
        <div className={classes.container}>
            <div className={classes.menu}><Menu /></div>
            <div className={classes.courses}><Courses /></div>
            <div className={classes.cart}><Cart /></div>
        </div>
        <FloatingButton cart orders />
        {showToast&&<Toast message={message}/>}
       </>
        )
}


export default Home;