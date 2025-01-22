import { TankSummary } from "../types/tank-summary.type";
import TimePoint from "../types/timepoint.type";


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

    results[0].tankCapacity = 10000;
    results[0].ingredientComposition.push({ "id": 100, "ingredientName": 'ingredient 1', "qty": 100, "uom": 'pounds' });
    results[0].varietalComposition.push({"id": 100, "varietyName":"Variety A", "pct": 100});


    results[1].tankCapacity = 20000;
    results[1].ingredientComposition.push({ "id": 200, "ingredientName": 'ingredient 1', "qty": 100, "uom": 'pounds' });
    results[1].ingredientComposition.push({ "id": 300, "ingredientName": 'ingredient 2', "qty": 150, "uom": 'pounds' });
    results[1].varietalComposition.push({"id": 200, "varietyName":"Variety B", "pct": 100});

    return results;
}


export const timePoints:Array<TimePoint> = [
    {"date": '1/5/2024', 'time': '08:30','tanksChanged':''},
    {'date': '1/5/2024', 'time': '12:30','tanksChanged':''},
    {'date': '1/5/2024', 'time': '14:00','tanksChanged':''},
    {'date': '1/5/2024', 'time': '18:15','tanksChanged':''},

    {'date': '1/6/2024', 'time': '01:15','tanksChanged':''},
    {'date': '1/6/2024', 'time': '05:45','tanksChanged':''},
    {'date': '1/6/2024', 'time': '15:00','tanksChanged':''},
    {'date': '1/6/2024', 'time': '19:22','tanksChanged':''},

    {'date': '1/7/2024', 'time': '02:22','tanksChanged':''},
    {'date': '1/7/2024', 'time': '06:22','tanksChanged':''},
    {'date': '1/7/2024', 'time': '21:22','tanksChanged':''},

    {'date': '1/8/2024', 'time': '03:00','tanksChanged':''},
    {'date': '1/8/2024', 'time': '06:00','tanksChanged':''},
    {'date': '1/8/2024', 'time': '14:45','tanksChanged':''},
    {'date': '1/8/2024', 'time': '18:30','tanksChanged':''},

];