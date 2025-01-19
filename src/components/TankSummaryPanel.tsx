
import styles from './TankSummaryPanel.module.scss';

const TankSummaryPanel:FC = ()=>{

    return (

        <div id="tank-summary-panel" className={styles['tank-summary-panel']}>
            <div className={styles['header']}>
                <h3>SAMPLE TNK</h3>
            </div>
            <hr/>

        </div>
    )

}

export default TankSummaryPanel;