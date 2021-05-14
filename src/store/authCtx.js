import React, {useState} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    token:'',
    login : (token) =>{},
    logout : () =>{}
})

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const isLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const logoutHandler = () => {
        setToken('')
        localStorage.removeItem('token')
    }

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