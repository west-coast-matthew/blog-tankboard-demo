import { TankConfig } from "../types/tank-config.type";
import { TankSummary } from "../types/tank-summary.type";
import { getInitialTankSummarySet } from "../utils/mock-utils";


/**
 * Tank configurations, these are fetched once for the application.
 */
const mockTankConfig = {
    "tanks": [
        { "id":'tank-crush-100', "name": 'CRUSH 1', xPos: 100, yPos: 225, width: 231, height: 693},
        { "id":'tank-crush-200', "name": 'CRUSH 2', xPos: 100, yPos: 375, width: 231, height: 693},
        
        { "id":'tank-300', "name": 'PSTR 1', xPos: 400, yPos: 125, width: 231, height: 693},
        { "id":'tank-400', "name": 'FLT 1', xPos: 400, yPos: 325, width: 231, height: 693},
        { "id":'tank-500', "name": 'CHILLER 1', xPos: 400, yPos: 525, width: 231, height: 693},
        
        { "id":'tank-600', "name": 'FLTR 2', xPos: 725, yPos: 125, width: 231, height: 693},
        { "id":'tank-700', "name": 'MIX 1', xPos: 825, yPos: 125, width: 231, height: 693},
        { "id":'tank-800', "name": 'MIX 2', xPos: 760, yPos: 325, width: 231, height: 693},
        { "id":'tank-900', "name": 'MIX 3', xPos: 760, yPos: 525, width: 231, height: 693},

        { "id":'tank-blk-store-1', "name": 'BLK STORE 1', xPos: 1120, yPos: 100, width: 231, height: 693},
        { "id":'tank-blk-store-2', "name": 'BLK STORE 2', xPos: 1120, yPos: 240, width: 231, height: 693},
        { "id":'tank-blk-store-3', "name": 'BLK STORE 3', xPos: 1120, yPos: 375, width: 231, height: 693},
        { "id":'tank-blk-store-4', "name": 'BLK STORE 4', xPos: 1120, yPos: 525, width: 231, height: 693}

    ],
    "tankGroups": [
        { "id":100, "label": 'Intake', xPos: 25, yPos: 25, width: 231, height: 693},
        { "id":101, "label": 'Bulk Processing', xPos: 265, yPos: 25, width: 350, height: 693},
        { "id":102, "label": 'Processing', xPos: 625, yPos: 25, width: 350, height: 693},
        { "id":103, "label": 'Storage', xPos: 985, yPos: 25, width: 350, height: 693}
    ]
};

/**
 * Retrieve inventory levels. This should be 
 */
export const getTankSummaries = ():Array<TankSummary> =>{
    return getInitialTankSummarySet();
}

/**
 * Load tank definition for layout purposes. For the purppose of this 
 * demo, we emulate a remote call for the sake of simplicity.
 * 
 * @returns 
 */
export const loadTankConfig = ():TankConfig=>{
    
    return mockTankConfig;
}



