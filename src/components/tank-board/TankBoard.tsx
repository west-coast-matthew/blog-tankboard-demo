import { FC } from 'react';
import styles from './TankBoard.module.scss';


const TankBoard:FC = ()=>{

    return(
        <div className={styles['tank-board']}>
            
            <div>Tank board</div>
            <div>x</div>
        </div>
    )
};


export default TankBoard;