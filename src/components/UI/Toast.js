import classes from './Toast.module.css';


const Toast = (props) => {
return(
    <div className={classes.toast}>
        <span>{props.message}</span>
    </div>
);
}


export default Toast;