import { TankSummary } from "../types/tank-summary.type";


const getTankSummaryTemplate = (tankId:string, name: string, desc: string):TankSummary =>{
    const tank:TankSummary = {
        tankId: tankId, tankName: name, description: desc, curLevel: 0, tankCapacity: 10000,
        ingredientComposition: [],
        varietalComposition: [],
        productType: ""
    };
    
    return tank;
};

export const getInitialTankSummarySet = ():Array<TankSummary> => {
    const results:Array<TankSummary> = [];

    results.push(getTankSummaryTemplate('tank-crush-100','CRUSH 1','Initial processing tank for juice extraction'));
    results.push(getTankSummaryTemplate('tank-crush-200','CRUSH 2','Initial processing tank for juice extraction'));
    results.push(getTankSummaryTemplate('tank-300','FLTR 1','Ini'));
    results.push(getTankSummaryTemplate('tank-400','MIX 1','Mixing tank for ingredient additions'));
    results.push(getTankSummaryTemplate('tank-500','MIX 2','Mixing tank for ingredient additions'));
    results.push(getTankSummaryTemplate('tank-600','FLTR 2','Removes pulp from juice'));
    results.push(getTankSummaryTemplate('tank-700','MIX 1','Mixing tank for ingredient additions'));
    results.push(getTankSummaryTemplate('tank-800','MIX 2','Mixing tank for ingredient additions'));
    results.push(getTankSummaryTemplate('tank-900','MIX 3','Mixing tank for ingredient additions'));
    results.push(getTankSummaryTemplate('tank-blk-store-1','BLK STORE 1','Stages final product until it is packaged.'));
    results.push(getTankSummaryTemplate('tank-blk-store-2','BLK STORE 2','Stages final product until it is packaged.'));
    results.push(getTankSummaryTemplate('tank-blk-store-3','BLK STORE 3','Stages final product until it is packaged.'));
    results.push(getTankSummaryTemplate('tank-blk-store-4','BLK STORE 4','Stages final product until it is packaged.'));

    return results;
}