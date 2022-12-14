import { Stats } from "./stats";

export interface GetFoodDataResponse {
    processedFoodData: ProcessedFoodData[],
}

interface ProcessedFoodData {
    food: GetFoodDataResponseBaseData,
    stats: Stats,
    imageBase64: string,
}

interface GetFoodDataResponseBaseData {
    fineliId: number,
    foodNameTranslationId: string,
}