import React from 'react';
import classes from './Home.module.css';

const Home = () => {
    return (
        <div className={classes.homeBackground}>
            <div className={classes.homeActivityContainer}>
                <div className={classes.topContainer}>
                    <div className={classes.addWordContainer}>
                        <input type='text' className={classes.addWord} placeholder='Enter your point to remember' />
                        <hr className={classes.topHr} />
                    </div>
                </div>
                <div className={classes.bottomContainer}>
                    <div className={classes.activityListContainer}></div>
                </div>
            </div>
        </div>
    );
};

export default Home;