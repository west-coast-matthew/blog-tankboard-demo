import TankDefinition from "./tank-defintion.type";
import TankGroup from "./tank-group.type";

export interface TankConfig{
    tankGroups: Array <TankGroup>, 
    tanks: Array<TankDefinition>
}