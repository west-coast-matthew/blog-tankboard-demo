import {FC} from 'react';
import { TankSummary } from '../../types/tank-summary.type';
import styles from './TankSummaryPanel.module.scss';
import MetricSummaryPanel from './MetricSummaryPanel';
import IngredientComposition from '../../types/composition/ingredient-composition.type';
import VarietalComposition from '../../types/composition/varietal-composition.type';

export interface Props{
    selTankSummary?: TankSummary,
    dialogTop?:number,
    dialogLeft?:number
};
 
const TankSummaryPanel: FC<Props> = ({ selTankSummary, dialogTop, dialogLeft }) => {

    const formatIngredientComp = (comp:Array<IngredientComposition>=[])=>{	

        if(!comp||comp.length<1){
            return (
                <div className={styles['no-data-placeholder']}>No Data</div>
            )
        };

        const metrics = comp.map((ing)=>{
            return (<MetricSummaryPanel label={ing.ingredientName} value={String(ing.qty)} />)
        });

        return (
            <div>
                {metrics}
            </div>
        )
    }

    const formatVarietalComp = (comp:Array<VarietalComposition>=[])=>{	

        if(!comp||comp.length<1){
            return (
                <div className={styles['no-data-placeholder']}>No Data</div>
            )
        };

        const metrics = comp.map((entry)=>{
            return (<MetricSummaryPanel label={entry.varietyName} value={`${String(entry.pct)}%`} />)
        });

        return (
            <div>
                {metrics}
            </div>
        )
    }

    const getTankSummaryPanel = ()=>{
        
        let pctCapacity:number = 0;
        if(selTankSummary){
            pctCapacity = selTankSummary.curLevel / selTankSummary.tankCapacity;
        }
        
        return(
            <div >
                <div className={styles['description']}>
                    {selTankSummary?.description}
                    
                </div>
                <div className={styles['summary-panel']}>
                    <MetricSummaryPanel label="ID:" value={selTankSummary?.tankId || ''} />
                    <MetricSummaryPanel label="Capacity:" value={String(selTankSummary?.tankCapacity)} />
                    <MetricSummaryPanel label="Current Gallons:" value={String(selTankSummary?.curLevel)} />
                    <MetricSummaryPanel label="Max Capacity:" value={`${String( selTankSummary?.tankCapacity)}`} />
                    <MetricSummaryPanel label="Cur Capacity :" value={`${String( pctCapacity)}%`} />
                    <MetricSummaryPanel label="Work Order:" value={selTankSummary?.lastWorkOrderNumber || ''} />

                    <div className={styles['comp-header']}>
                        Ingredient Composition:
                    </div>
                    
                    {
                        formatIngredientComp(selTankSummary?.ingredientComposition)
                    }

                    <div className={styles['comp-header']}>
                        Varietal Composition:
                    </div>
                    {
                       formatVarietalComp(selTankSummary?.varietalComposition)
                    }
                </div>
            </div>
        );
    }

    return (

        <div id="tank-summary-panel" className={styles['tank-summary-panel']} style={{top: dialogTop, left: dialogLeft}}>
            <div className={styles['header']}>
                <h3>{ selTankSummary?.tankName || 'No selection' }</h3>
            </div>
            <hr/>

            {
                selTankSummary && getTankSummaryPanel()
            }

        </div>
    )

}

export default TankSummaryPanel;