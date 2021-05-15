import { useState } from 'react';
import CourseItem from './CourseItem/CourseItem';
import classes from './Courses.module.css';


const Courses = (props) => {

    

    return(
        <div className={classes.container}>
            <h2>Soup</h2>
            <h4 className={classes.type}>Non veg</h4>

            <CourseItem />
            <CourseItem />
            <CourseItem />
            <CourseItem />
            <CourseItem />
            <CourseItem />

            
            
        </div>);
}


export default Courses;