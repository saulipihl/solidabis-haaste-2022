import { Stats } from "./stats";

export interface FoodData extends Stats {
    fineliId: number,
    foodNameTranslationId: string,
    imageBase64: string,
}