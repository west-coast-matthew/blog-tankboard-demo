import {FC} from 'react';
import styles from './MetricSummaryPanel.module.scss';

export interface Props{
    label: string, 
    value: string
};

const MetricSummaryPanel: FC<Props> = ({ label, value }) => {

    const formatValue = (val:string):string=>{
        if(!val || val===undefined){
            return ''
        }
        return val;
    }


    return (
            <div className={styles['metric-summary-panel']}>
                <div className={styles['label']}>
                    {label}
                </div>
                <div className={styles['value']}>
                    {formatValue(value) }
                </div>
            </div>
        
    );

}

export default MetricSummaryPanel;