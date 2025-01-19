import IngredientComposition from "./composition/ingredient-composition.type"
import VarietalComposition from "./composition/varietal-composition.type"

/**
 * TankSummary
 * 
 *  Models a somewhat denormalized set of data for a given tank including basic details, 
 * and composition related information. This data reflects the state of a tank for a given point in time.
 * The data is sampled at a rate of every 5 minutes. This is acceptable as operations typically 
 * tank several hours to complete, so realtime requests are overkill. The client 
 * will need to be responsible for periodically polling the API in order to get 
 * up to date tank data.
 * 
 * 
 */
export interface TankSummary{
    tankId: string,
    tankName: string, 
    description?: string,
    tankCapacity: number, 
    curLevel: number, 
    lastWorkOrderNumber?: string,
    lastWorkOrderDate?: string,
    ingredientComposition: Array<IngredientComposition>,
    varietalComposition: Array<VarietalComposition>
    productType?: string
}