import classes from './Login.module.css';
import Input from '../../components/UI/Input';
import {useState, useContext, useEffect} from 'react';
import Button from '../../components/UI/Button';
import OTP from '../../components/UI/OTP';
import firebase from '../../utils/firebase';
import { DATABASE } from '../../utils/API';
import AuthContext from '../../store/authCtx';
import { useHistory } from 'react-router';
import Toast from '../../components/UI/Toast';
import Loading from '../../components/UI/Loading';


function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
const Login = (props) => {
    const authCtx = useContext(AuthContext);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOTP] = useState("");
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [res, setRes] = useState({});
    const [loading, setLoading] = useState(false)
    const [showToast, setToast] = useState(false);
    const [message, setMessage] = useState('');

    const [showButton, setShowButton] = useState(true);

    useEffect(()=>{
        if(showToast) {
            setTimeout(()=>{
                setToast(false)
                setMessage('')
            }, 2000)
        }
    }, [showToast])

    const history = useHistory()
    async function actionHandler() {
        
        if(!otpSent) {
            
            if(mobileNumber.length!==Number(10)) {
                setToast(true)
                setMessage('Please enter valid phone number')
                // console.log("Enter Mobile Number")
                return
            }
            if(!name) {
                console.log("Pl")
                setToast(true)
                setMessage('Please enter name')
                return
            }
            console.log(mobileNumber)
            const number = "+91"+mobileNumber;
            console.log('Validate OTP ', number)
            
           
            try {
                setShowButton(false)
                let recapcha = new firebase.auth.RecaptchaVerifier('recapcha', {theme:'dark'})
                
                const re = await firebase.auth().signInWithPhoneNumber(number, recapcha)
                setLoading(true)
                setRes(re)
                console.log(JSON.stringify(re))
                if(!otpSent) {
                    recapcha.clear()
                    setOtpSent(true)
                    setToast(true)
                    setShowButton(true)
                    setMessage('Otp has been successfully sent')
                }
               
                
                
            } catch(error) {
                console.log(error);
                setToast(true)
                setMessage('Some error occured while communicating with the server')
            }
            setLoading(false)
        } else {
            setLoading(true)
            try {
                // setLoading(true)
                console.log(otp)
                let result = await res.confirm(otp);
                result = await JSON.parse(JSON.stringify(result))
                setToast(true)
                setMessage('Logged In')
                const uid = result.user.uid
                console.log(result)
                const token = result["user"]["stsTokenManager"]["accessToken"];
                if(result.additionalUserInfo) {
                    if(result.additionalUserInfo.isNewUser) {
                        DATABASE.put(`/users/${uid}.json?auth=${token}`,{name:name, phoneNumber: mobileNumber, uid:uid})
                    }
                }
                const time = result["user"]["stsTokenManager"]["expirationTime"];
                console.log(time)
                
                const authTime = new Date().getTime() + 72000000
                authCtx.login(token, authTime)
                // console.log(result)
                setTimeout(()=>{
                    history.replace('/')
                }, 2000)
                
            } catch(error) {
                setToast(true)
                setMessage('Some error occured while communicating with the server')
                console.log(error);
            } 
            setLoading(false)  
        }
    }

    const mobileChangeHandler = (event) => {
        setMobileNumber(event.target.value)
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value)
    }
    
    const changeMobilehandler = () => {
        setOtpSent(false)
        setOTP("")
    }

    const addOTP = (digit, index) => {
        setOTP((prev)=>{
            if(prev.length>index) prev = setCharAt(prev,index,digit)
            else prev+=digit
            return prev
        })
    }
return(
    <>
    {loading&&<Loading />}
    <div className={classes.container}>
        
        <div className={classes.left}>
            
            <p className={classes.line1}>Sometimes me think, <br/>‘What is Friend?’</p>
            <p className={classes.line2}>And then me say, <br/> ‘Friend is someone to share the last <span className={classes.red}>cookie</span> with.<span className={classes.cookie}><i class="fas fa-cookie-bite"></i></span></p> 
            
            
        </div>
        <div className={classes.right}>
            <h1 className={classes.title}>Welcome to <span className={classes.red}>Bhavesh's Kitchen</span></h1>
        <div className={classes.card}>
            {!otpSent&&<><Input value={name} change={nameChangeHandler} label={"Enter Name"} id={"2"} /> <Input value={mobileNumber} change={mobileChangeHandler} label={"Phone Number"} id={"1"} /></>}
            {!otpSent&&<div id={"recapcha"}></div>}
            {otpSent&&<OTP saveOTP={addOTP}  />}
            <div className={classes.centre}><Button dis={!showButton} click={actionHandler}>{otpSent?`Login`:`Send otp`}</Button>{otpSent&&<button onClick={changeMobilehandler} className={classes.inlineBtn}>Edit mobile number?</button>}</div>
        </div>
        </div>
        
    </div>
    {showToast&&<Toast message={message} />}
    </>
);
}


export default Login;