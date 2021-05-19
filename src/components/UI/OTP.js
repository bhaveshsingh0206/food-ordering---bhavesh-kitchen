import { useEffect, useRef, useState } from 'react';
import classes from './OTP.module.css';

let timer;
const OTP = (props) => {
	
	const focusRef = useRef()
	const [seconds, setSeconds] = useState(10);
	// const [resendOTP, setRecentOTP] = useState(false)
	
	useEffect(()=>{
		
		if(seconds===Number(0)) {
			clearInterval(timer);
			// setRecentOTP(true)
		}
	}, [seconds])

    const clickHandler = (first, last, index) =>{
        if(document.getElementById(first).value.length) {
            document.getElementById(last).focus();

			props.saveOTP(document.getElementById(first).value, index);
        }    
    }

	// const resendHandler = () => {
		
	// 	if(resendOTP) {
	// 		setRecentOTP(false);
	// 		setSeconds(10);
	// 		timer = setInterval(()=>{
	// 			setSeconds((prevState)=>{
	// 				return prevState-1;
	// 			});
	// 		}, 1000)
	// 	}
	// }

	useEffect(()=>{
		focusRef.current.focus()
		timer = setInterval(()=>{
			setSeconds((prevState)=>{
				return prevState-1;
			});
		}, 1000)
	},[])
    


return(
    <div className={classes["otp-container"]}>
		<h1>Enter the code send to your mobile device below.</h1>
		<div className={classes.userInput}>
			<input ref={focusRef} className={classes.otp} type="text" id='ist' maxLength="1" onKeyUp={()=>{clickHandler('ist', 'second', 0)}} />
			<input className={classes.otp} type="text" id="second" maxLength="1" onKeyUp={()=>{clickHandler('second', 'third', 1)}} />
			<input className={classes.otp} type="text" id="third" maxLength="1" onKeyUp={()=>{clickHandler('third', 'fourth', 2)}} />
			<input className={classes.otp} type="text" id="fourth" maxLength="1" onKeyUp={()=>{clickHandler('fourth', 'fifth', 3)}} />
			<input className={classes.otp} type="text" id="fifth" maxLength="1" onKeyUp={()=>{clickHandler('fifth', 'sixth', 4)}}/>
			<input className={classes.otp} type="text" id="sixth" maxLength="1" onKeyUp={()=>{clickHandler('sixth', 'ist', 5)}}/>
		</div>
		{/* <p className={classes.resend}><button onClick={resendHandler} disabled={!resendOTP}>Resend OTP</button>{seconds}s</p> */}
    </div>
);
}


export default OTP;