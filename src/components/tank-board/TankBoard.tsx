import { FC, useEffect, useRef, useState } from 'react';
import styles from './TankBoard.module.scss';
import * as fabric from 'fabric'; // Import everything from the module
import { getTankSummaries, loadTankConfig } from '../../services/tank-mgmnt.service';
import TankDefinition from '../../types/tank-defintion.type';
import TankGroup from '../../types/tank-group.type';
import { TankConfig } from '../../types/tank-config.type';
import { TankSummary } from '../../types/tank-summary.type';
import TankSummaryPanel from '../TankSummaryPanel/TankSummaryPanel';
import TimeLinePanel from '../TimelinePanel';

const TankBoard:FC = ()=>{

    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    const [dialogTop, setDialogTop] = useState(0);
    const [dialogLeft, setDialogLeft] = useState(0);

    const [selTank, setSelTank] = useState<TankDefinition|null>(null);
    const [selTankSummary, setSelTankSummary] = useState<TankSummary|null>(null);

    const [displayModal, setDisplayModal] = useState(false);

    // Stores the UI configuration returned from the API.
    const [tankCfg, setTankCfg] = useState<TankConfig>({tanks:[], tankGroups:[]});
    // Stores most recent API call to get up to date inventory data.
    const [tankSummaries, setTankSummaries] = useState<Array<TankSummary>|null>(null);

    const CANVAS_WIDTH = 1366;
    const CANVAS_HEIGHT = 768;

    const TANK_WIDTH = 75;
    
    const initDisplayElements = ()=>{
        setTankSummaries(getTankSummaries());
        const cfg = loadTankConfig();

        setTankCfg(cfg);

        renderGroupBorders(cfg.tankGroups);

        cfg.tanks.forEach(async (tank)=>{
            renderTank(tank)
        });
    }

    /**
     * Locate tank sprite information (name, positions, etc) for a 
     * selecetd tank id.
     * 
     * @param tankId 
     * @returns 
     */
    const lookupCfgTankById = (tankId:string, tankCfgs:TankConfig):TankDefinition|null=>{
        const selTankCfg = tankCfgs?.tanks.find((tank:TankDefinition)=>{
            return tank.id===tankId;
        });
        if(!selTankCfg){
            console.warn(`Cannot find selected tank ${tankId}`);
        }
        return selTankCfg || null;
    }

    /**
     * Locate summary information (inventory, etc.) for a selected tank
     * 
     * @param tankId 
     * @returns 
     */
    const lookupTankSummaryById = (tankId:string):TankSummary|null=>{
        
        const selTankSummary = tankSummaries?.find((tank:TankSummary)=>{
            return tank.tankId===tankId;
        });

        return selTankSummary || null;
    }

    const renderGroupBorders = (tankGroups:Array<TankGroup>)=>{
        tankGroups.forEach((group)=>{
            const rect = new fabric.Rect({
                id: group.id,
                left: group.xPos,
                top: group.yPos,
                width: group.width,
                height: group.height,
                fill: null,
                stroke: 'white',
                strokeWidth: 1,
                evented: false,
                rx: 10,
                ry: 10,
              });
    
              //fabricCanvasRef.current?.add(rect);

              const text = new fabric.Text(group.label, { 
                left: group.xPos + 10, //Take the block's position
                top: group.yPos + 10, 
                fontSize: 18,
                fill: 'white',
                fontFamily: 'Arial'
            });
            
            fabricCanvasRef.current?.add(rect, text);
        });
    }

    const renderTank = async(tank:TankDefinition)=>{

        fabric.loadSVGFromURL('/tank-example.svg')
        .then(async (objects)=>{
            
            if(objects){
                
                const svg = fabric.util.groupSVGElements(objects.objects, {
                    id: tank.id,
                    top: tank.yPos, 
                    left: tank.xPos,
                    lockScalingX: true,
                    lockScalingY: true,
                    hasControls: false,
                    opacity: .05,
                    hoverCursor: 'pointer'
                });
                
                // Apparently we cannot declate dimensions in the options, but we can set scale.
                svg.scaleToWidth(TANK_WIDTH);

                // Enable fade in of elements
                svg.animate({'opacity': 1},{
                    onChange: fabricCanvasRef.current?.renderAll.bind(fabricCanvasRef.current),
                    easing: fabric.util.ease.easeInCubic,
                    duration: 250
                });

                const label = new fabric.Textbox(tank.name, { 
                    left: tank.xPos -65, //Take the block's position
                    top: tank.yPos + 100,
                    textAlign: 'center', 
                    fontSize: 18,
                    fill: 'white',
                    fontFamily: 'Arial',
                    width: 200,
                    borderColor: 'white'
                });

                fabricCanvasRef?.current?.add(svg,label);                  
            }

        }).catch(e=>{
            console.warn(e);
        })

    };

      useEffect(() => {
        
        if (canvasRef.current) {
          // Create Fabric canvas if it doesn't exist
          if (!fabricCanvasRef.current) {
            
            fabricCanvasRef.current = new fabric.Canvas('canvas',{});
            fabricCanvasRef.current.setDimensions({width: CANVAS_WIDTH, height: CANVAS_HEIGHT});
            fabricCanvasRef.current?.on('mouse:over',(evt)=>{
                const sel:fabric.FabricObject = evt.target as fabric.FabricObject;
                
                if(!sel){
                    return;
                }  

                if(sel.id && sel.id.startsWith('tank-')){
                    fabricCanvasRef.current?.setActiveObject(evt.target);
                    setSelTank(lookupCfgTankById(sel.id, tankCfg));
                    setSelTankSummary(lookupTankSummaryById(sel.id));
                    setDisplayModal(true);

                    // Determine modal coordinates
                    setDialogLeft(sel.left);
                    setDialogTop(sel.top);

                }
                
            });
            fabricCanvasRef.current?.on('mouse:out',()=>{
                setSelTank(null);
                setSelTankSummary(null);
                setDisplayModal(false);
            });

            initDisplayElements();
          } 
    
          // Clean up on unmount
          return () => {
            if (fabricCanvasRef.current) {
              fabricCanvasRef.current.dispose();
              fabricCanvasRef.current = null;
            }
          };
        }
      }, []);
    
    return(
        <div className={styles['tank-board']}>
            <div>
                <div className={styles['debug']}>
                    [{ selTank?.name || 'no selection' }],
                    { String(tankCfg.tanks.length) }
                    </div>
                <canvas id="canvas" width="500" height="500" ref={canvasRef}></canvas>
            </div>
            { displayModal && (
                <TankSummaryPanel  selTankSummary={selTankSummary||undefined}/>
            )}
            
            <TimeLinePanel />
        </div>
    )
};


export default TankBoard;