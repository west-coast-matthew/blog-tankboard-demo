import { FC, useEffect, useRef } from 'react';
import styles from './TankBoard.module.scss';
import * as fabric from 'fabric'; // Import everything from the module
import { loadTanks } from '../../services/tank-mgmnt.service';
import TankDefinition from '../../types/tank-defintion.type';

const TankBoard:FC = ()=>{

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    const CANVAS_WIDTH = 700;
    const CANVAS_HEIGHT = 500;

    const TANK_WIDTH = 50;
    const TANK_HEIGHT = 100;

    const initDisplayElements = ()=>{
        console.log(`Initializing display elements...`);

        const config = loadTanks();
        let pos:number = 10;
        config.tanks.forEach((tank)=>{
            pos = pos + 25;
            renderTank(tank, pos, pos)
        });
    }

    const renderTank = (tank:TankDefinition, top:number, left: number)=>{

        console.log(`drawing image`, tank);

        // loadSVG('/class-diagram.svg')
        fabric.loadSVGFromURL('/tank-example.svg')
        .then((objects)=>{
            // console.log('adding image to canvas...: ', objects.objects);
            
            if(objects){
                
                const svg = fabric.util.groupSVGElements(objects.objects, {
                    top: top, 
                    left: left,
                    lockScalingX: true,
                    lockScalingY: true,
                    hasControls: false,
                });
                
                // Apparently we cannot declate dimensions in the options, but we can set scale.
                svg.scaleToWidth(TANK_WIDTH);
                fabricCanvasRef?.current?.add(svg);
            }
            

        }).catch(e=>{
            console.log(e);
        })

    };

      useEffect(() => {
        //console.log(`useEffect`);
        if (canvasRef.current) {
          // Create Fabric canvas if it doesn't exist
          if (!fabricCanvasRef.current) {
            //console.log(`Use ref, intializing canvas....`);
            fabricCanvasRef.current = new fabric.Canvas('canvas',{});
            fabricCanvasRef.current.setDimensions({width: CANVAS_WIDTH, height: CANVAS_HEIGHT});
            
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
                <canvas id="canvas" width="500" height="500" ref={canvasRef}></canvas>
            </div>
        </div>
    )
};


export default TankBoard;