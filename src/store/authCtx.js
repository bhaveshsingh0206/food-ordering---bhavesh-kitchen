import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    token:'',
    login : (token, expirationTime) =>{},
    logout : () =>{}
})


const calculateRemainingTime = (expirationTime) => {
    const currentTime =new Date().getTime();
    const expTime = new Date(expirationTime).getTime();
    console.log("currentTime ", currentTime," expTime ", expirationTime)
    const remainingTime = expirationTime-currentTime;
    return remainingTime;
}

const validToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedTime = localStorage.getItem('expirationTime');
    console.log("storedTime ", storedTime)
    const remainingTime = calculateRemainingTime(storedTime)
    console.log("remainingTime ", remainingTime)
    if (remainingTime<=0) {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null;
    }
    return {token:storedToken, time:remainingTime}

}

export const AuthContextProvider = (props) => {
    
    const tokenData = validToken();
    
    let initialToken = '';
    
    if(tokenData) {
        initialToken = tokenData.token
    }

    const [token, setToken] = useState(initialToken);

    const isLoggedIn = !!token;

    const logoutHandler = () => {
        setToken('')
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
    }

    const loginHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem('token', token)
        
        localStorage.setItem('expirationTime', expirationTime)
        const remainingTime = calculateRemainingTime(expirationTime);
        
        console.log(remainingTime)
        setTimeout(logoutHandler, remainingTime)
    }

    useEffect(() => {
        if(tokenData) {
            setTimeout(logoutHandler, tokenData.time)
        }
        
    }, [tokenData])

    const contextValue = {
        isLoggedIn: isLoggedIn,
        token: token,
        login: loginHandler,
        logout: logoutHandler
    }
    
    return (<AuthContext.Provider value={contextValue}>
                {props.children}
            </AuthContext.Provider>)
}

export default AuthContext;