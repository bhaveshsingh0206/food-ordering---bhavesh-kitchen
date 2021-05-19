import classes from './Loading.module.css';


const Loading = (props) => {
return(
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            {/* <div className={classes.circle}></div> */}
            {/* <div className={classes.shadow}></div> */}
            <div className={classes.shadow}></div>
            <div className={classes.shadow}></div>
        <div className={classes.shadow}></div>
        
        </div>
    </div>
    
);
}


export default Loading;