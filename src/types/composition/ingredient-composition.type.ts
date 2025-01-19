/**
 * Used for tracking ingredient additions. These might include sweeteners
 * vitamin additions, food stableizers, etc.
 */
export default interface IngredientComposition{
    
    id: number, 
    ingredientName: string,
    qty: number
    uom: string
}