import { TankConfig } from "../types/tank-config.type";



const mockTanks = {
    "tanks": [
        { "id":100, "name": 'tank 100'},
        { "id":200, "name": 'tank 200'},
        { "id":300, "name": 'tank 300'}
    ],
    "tankGroups": [
        { "id":100, "label": 'Bulk Processing'}
    ]
};

export const loadTanks = ():TankConfig=>{
    
    return mockTanks;
}



