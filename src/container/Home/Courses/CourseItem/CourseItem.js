import classes from './CourseItem.module.css';
import { useState } from 'react';

const CourseItem = (props) => {

    const [active, setActive] = useState(false)
    const [count, setCount] = useState(Number(0))

    const activeHandler = () => {
        setCount(1)
        setActive(true)
        
        
    }

    const subHandler = () => {
        setCount((prev)=>{
            if(count===1) setActive(false)
            return prev-1;
        })
        
    }

    const addHandler = () => {
        setCount((prev)=>{
            return prev+1;
        })
    }

    return(<div className={classes.itemCard}>
        <span className={`${classes.circle} ${classes.circleRed}`}/>
        <h5>Veg Manchow Soup</h5>
        <div className={classes.controls}>
            <span className={classes.amount}>&#8377; 150</span>
            <span className={classes.controlBtns}>
                {active&&<span><button disabled={!active} onClick={subHandler}>-</button><span className={classes.count}>{count}</span><button onClick={addHandler}>+</button></span>}
                {!active&&<button  onClick={activeHandler} className={classes.add}>Add</button>}
            </span>
        </div>
    </div>);
}


export default CourseItem;