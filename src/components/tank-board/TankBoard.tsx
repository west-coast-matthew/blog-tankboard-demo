import { FC, useEffect, useRef, useState } from 'react';
import styles from './TankBoard.module.scss';
import * as fabric from 'fabric'; // Import everything from the module
import { loadTanks } from '../../services/tank-mgmnt.service';
import TankDefinition from '../../types/tank-defintion.type';
import TankGroup from '../../types/tank-group.type';

const TankBoard:FC = ()=>{

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
    const [selTank, setSelTank] = useState('none');

    const CANVAS_WIDTH = 1366;
    const CANVAS_HEIGHT = 768;

    const TANK_WIDTH = 75;
    const TANK_HEIGHT = 100;

    const initDisplayElements = ()=>{
        console.log(`Initializing display elements...`);

        const config = loadTanks();

        renderGroupBorders(config.tankGroups);

        let pos:number = 10;
        config.tanks.forEach(async (tank)=>{
            pos = pos + 25;
            renderTank(tank, pos, pos)
            console.log(`listo!`);
        });
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

    const renderTank = async(tank:TankDefinition, top:number, left: number)=>{

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
                console.log(sel);

                if(sel.id && sel.id.startsWith('tank-')){
                    fabricCanvasRef.current?.setActiveObject(evt.target);
                    console.log(`event: mouse over on tank!`, sel.id);
                    setSelTank(sel.id);
                }
                
            });
            fabricCanvasRef.current?.on('mouse:',(evt)=>{

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
                <div>{ selTank }</div>
                <canvas id="canvas" width="500" height="500" ref={canvasRef}></canvas>
            </div>
        </div>
    )
};


export default TankBoard;