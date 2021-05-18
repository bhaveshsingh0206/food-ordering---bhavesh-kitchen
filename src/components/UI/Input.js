import classes from './Input.module.css';


const Input = (props) => {
return(
    <div className={classes.form__group}>
        <input disabled={props.disabled} value={props.value} onChange={props.change} ref={props.r} type={props.type} className={classes.form__input} placeholder={props.label} id={props.id} autoComplete="off" />
        <label htmlFor={props.id} className={classes.form__label}>{props.label}</label>
    </div>
);
}


export default Input;