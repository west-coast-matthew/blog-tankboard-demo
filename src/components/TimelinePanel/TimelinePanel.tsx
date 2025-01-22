
import { FC, useEffect, useState } from 'react';
import styles from './TimelinePanel.module.scss';
import { timePoints } from '../../utils/mock-utils';
import TimePoint from '../../types/timepoint.type';




const TimeLinePanel:FC = ()=>{

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    useEffect(()=>{
        const defaultPoint = timePoints[0];
        setSelectedDate(defaultPoint.date);
        setSelectedTime(defaultPoint.time);

    },[]);

    const getTimeReferences = ()=>{

        const inputs =timePoints.map((entry:TimePoint)=>{

            const selLabel:string = (entry.date===selectedDate && entry.time===selectedTime) ? 'selected' : ''; 

            return(
                <option key={`${entry.date}-${entry.time}`} value="">{entry.date} {entry.time} {selLabel}</option>
            )
        });

        return (
            <select>
                {inputs}
            </select>
        )
    }

    return (
        <div className={styles['timeline-panel']}>
            Timeline Panel
            <div>Select a date to view tank status at a given period in time</div>
            <div className={styles['time-reference-panel']}>
                { getTimeReferences()
                    
                }
            </div>
        </div>
    )
};

export default TimeLinePanel;