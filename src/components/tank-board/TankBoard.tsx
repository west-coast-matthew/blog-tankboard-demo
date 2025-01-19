import { FC, useEffect, useRef, useState } from 'react';
import styles from './TankBoard.module.scss';
import * as fabric from 'fabric'; // Import everything from the module
import { getTankSummaries, loadTankConfig } from '../../services/tank-mgmnt.service';
import TankDefinition from '../../types/tank-defintion.type';
import TankGroup from '../../types/tank-group.type';
import { TankConfig } from '../../types/tank-config.type';
import { TankSummary } from '../../types/tank-summary.type';
import TankSummaryPanel from '../TankSummaryPanel';

const TankBoard:FC = ()=>{

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
    const [selTank, setSelTank] = useState<TankDefinition|null>(null);
    const [selTankSummary, setSelTankSummary] = useState<TankSummary|null>(null);

    // Stores the UI configuration returned from the API.
    const [tankCfg, setTankCfg] = useState<TankConfig|null>(null);
    // Stores most recent API call to get up to date inventory data.
    const [tankSummaries, setTankSummaries] = useState<Array<TankSummary>|null>(null);

    const CANVAS_WIDTH = 1366;
    const CANVAS_HEIGHT = 768;

    const TANK_WIDTH = 75;
    
    console.log(tankSummaries?.length);
    console.log(selTankSummary);

    const initDisplayElements = ()=>{
        console.log(`Initializing display elements...`);

        setTankSummaries(getTankSummaries());
        const cfg = loadTankConfig();
        setTankCfg(cfg);

        renderGroupBorders(cfg.tankGroups);

        cfg.tanks.forEach(async (tank)=>{
            
            renderTank(tank)
            console.log(`listo!`);
        });
    }

    const lookupCfgTankById = (tankId:string):TankDefinition|null=>{
        const selTankCfg = tankCfg?.tanks.find((tank:TankDefinition)=>{
            return tank.id===tankId;
        });

        return selTankCfg || null;
    }

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

        console.log(`drawing image`, tank);

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
                    duration: 1000
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
            console.log(e);
        })

    };

      useEffect(() => {
        
        if (canvasRef.current) {
          // Create Fabric canvas if it doesn't exist
          if (!fabricCanvasRef.current) {
            
            fabricCanvasRef.current = new fabric.Canvas('canvas',{});
            fabricCanvasRef.current.setDimensions({width: CANVAS_WIDTH, height: CANVAS_HEIGHT});
            fabricCanvasRef.current?.on('mouse:over',(evt)=>{
                //console.log(evt.target);
                const sel:fabric.FabricObject = evt.target as fabric.FabricObject;
                console.log('sel',sel);


                if(sel.id && sel.id.startsWith('tank-')){
                    fabricCanvasRef.current?.setActiveObject(evt.target);
                    console.log(`event: mouse over on tank!`, sel.id);
                    setSelTank(lookupCfgTankById(sel.id));
                    setSelTankSummary(lookupTankSummaryById(sel.id));
                }
                
            });
            fabricCanvasRef.current?.on('mouse:out',(evt)=>{
                console.log(evt);
                console.log('mouse out');
                setSelTank(null);
                setSelTankSummary(null);
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
                <div className={styles['debug']}>[{ selTank?.name }]</div>
                <canvas id="canvas" width="500" height="500" ref={canvasRef}></canvas>
            </div>
            <TankSummaryPanel/>
        </div>
    )
};


export default TankBoard;