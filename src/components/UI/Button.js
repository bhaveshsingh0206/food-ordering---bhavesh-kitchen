import classes from './Button.module.css';


const Button = (props) => {
    let cla = `${classes.btn}`
    if(props.special) {
        cla = `${classes.btn} ${classes.special}`
    }

return(
    <button onClick={props.click} className={cla}>{props.children}</button>
);
}


export default Button;