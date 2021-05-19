import { useContext, useImperativeHandle } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../store/authCtx';
import './FloatingButton.css';


const FloatingButton = (props) => {
    const history = useHistory();
	const authCtx = useContext(AuthContext);

    const onClickHandler = (url) => {
        history.push(url)
    }
return(
    <div className="fab-container">
		<div className="fab fab-icon-holder">
            <i className="fas fa-utensils i"></i>
		</div>

		<ul className="fab-options">

		<li onClick={()=>{authCtx.logout()}}>
				<span className="fab-label">Logout</span>
				<div className="fab-icon-holder">
					<i className="fas fa-sign-out-alt"></i>
				</div>
			</li>


            {props.orders&&<li onClick={()=>{onClickHandler('/orders')}}>
				<span className="fab-label">Yours Orders</span>
				<div className="fab-icon-holder">
					<i className="fas fa-hamburger"></i>
				</div>
			</li>}

			{props.cart&&<li onClick={()=>{onClickHandler('/cart')}}>
				<span className="fab-label">Cart</span>
				<div className="fab-icon-holder">
					<i className="fas fa-shopping-cart"></i>
				</div>
			</li>}

            {props.home&&<li onClick={()=>{onClickHandler('/')}}>
				<span className="fab-label">Home</span>
				<div className="fab-icon-holder">
                <i className="fas fa-home"></i>
				</div>
			</li>}
			
		</ul>
	</div>
);
}


export default FloatingButton;