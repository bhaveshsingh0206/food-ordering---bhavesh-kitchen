import classes from './Login.module.css';
import Input from '../../components/UI/Input';
import {useState, useContext} from 'react';
import Button from '../../components/UI/Button';
import OTP from '../../components/UI/OTP';
import firebase from '../../utils/firebase';
import { DATABASE } from '../../utils/API';
import AuthContext from '../../store/authCtx';
import { useHistory } from 'react-router';


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
    const history = useHistory()
    async function actionHandler() {
        
        if(!otpSent) {
            
            if(mobileNumber.length!==Number(10)) {
                console.log("Enter Mobile Number")
                return
            }
            if(!name) {
                console.log("Enter Name")
                return
            }
            console.log(mobileNumber)
            const number = "+91"+mobileNumber;
            console.log('Validate OTP ', number)
            let recapcha = new firebase.auth.RecaptchaVerifier('recapcha', {theme:'dark'})
            try {
                const re = await firebase.auth().signInWithPhoneNumber(number, recapcha)
                setRes(re)
                console.log(JSON.stringify(re))
                if(!otpSent) {
                    recapcha.clear()
                    setOtpSent(true)
                }
               
                
                
            } catch(error) {
                console.log(error);
            }
        } else {
            try {
                console.log(otp)
                let result = await res.confirm(otp);
                result = await JSON.parse(JSON.stringify(result))
                const uid = result.user.uid
                const token = result["user"]["stsTokenManager"]["accessToken"];
                if(result.additionalUserInfo) {
                    if(result.additionalUserInfo.isNewUser) {
                        DATABASE.post(`/users.json?auth=${token}`,{name:name, phoneNumber: mobileNumber, uid:uid})
                    }
                }
                authCtx.login(token)
                console.log(result)
                history.replace('/')
            } catch(error) {
                console.log(error);
            }   
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
    <div className={classes.container}>
        
        {/* <div className={classes.left}> */}
            
            {/* <h2 className={classes.subheading}>ONE<span>-</span>STOP</h2>
            <h1 className={classes.mainheading}>Delicious</h1> */}
            
            {/* <div className={classes.img}> */}
                {/* <img src={food} /> */}
            {/* </div> */}
            
        {/* </div> */}
        <div className={classes.card}>
            {!otpSent&&<><Input value={name} change={nameChangeHandler} label={"Enter Name"} id={"2"} /> <Input value={mobileNumber} change={mobileChangeHandler} label={"Phone Number"} id={"1"} /></>}
            {!otpSent&&<div id={"recapcha"}></div>}
            {otpSent&&<OTP saveOTP={addOTP}  />}
            <div className={classes.centre}><Button click={actionHandler}>{otpSent?`Login`:`Send otp`}</Button>{otpSent&&<button onClick={changeMobilehandler} className={classes.inlineBtn}>Edit mobile number?</button>}</div>
        </div>
    </div>
);
}


export default Login;