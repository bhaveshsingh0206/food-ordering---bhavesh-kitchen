import { useContext } from 'react';
import CourseItem from './CourseItem/CourseItem';
import classes from './Courses.module.css';
import MenuContext from '../../../store/menuCtx'

const Courses = (props) => {
    const menuCtx = useContext(MenuContext);
    const menuData = menuCtx.menu;
    const categories = menuCtx.categories;

    

    const data = categories.map((key, j)=>{
        
        const innereData = menuData[key].map((item, i)=>{
                // 
            return <CourseItem small={false} key={item.id} id={item.id} name={item.name} price={item.price} isVeg={item.isVeg} />
        })

        return <section id={key} key={j} className={classes.section}>
            <h2>{key}</h2>
            <p className={classes.count}>{innereData.length} items</p>
            {innereData}
        </section>
    })


    return(
        <div className={classes.container}>
            {data} 
        </div>);
}


export default Courses;