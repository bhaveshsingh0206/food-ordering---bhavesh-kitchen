import classes from './Home.module.css';
import Menu from './Menu/Menu';
import MenuContext from '../../store/menuCtx'
import { useContext, useEffect } from 'react';
import {DATABASE} from '../../utils/API'
import AuthContext from '../../store/authCtx';
import Courses from './Courses/Courses';
import Cart from './Cart/Cart';

const Home = (props) => {

    const menuCtx = useContext(MenuContext);
    const authCtx = useContext(AuthContext);
    useEffect(()=>{
        async function fetchData() {
            try{
                const res = await DATABASE.get(`/menu.json?auth=${authCtx.token}`)
                const data = await res.data
                menuCtx.setMenuHandler(data)
                
            } catch(error) {
                console.log(error)
            }
        }
        fetchData();
        
    }, [authCtx.token])

    return(
        <>
        <div className={classes.container}>
            <div className={classes.menu}><Menu /></div>
            <div className={classes.courses}><Courses /></div>
            <div className={classes.cart}><Cart /></div>
        </div>
        </>
        )
}


export default Home;