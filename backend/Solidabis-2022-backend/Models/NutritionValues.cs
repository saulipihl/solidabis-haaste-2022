namespace Solidabis_2022_backend.Models
{
    /// <summary>
    /// Object to act as a mapper between the api data objects and stats
    /// </summary>
    public class NutritionValues
    {
        public NutritionValues(FineliFoodData foodData)
        {
            Energy_kcal = foodData.energyKcal;
            Carbs_g = foodData.carbohydrate;
            Protein_g = foodData.protein;
            Fat_g = foodData.fat;
        }
        public double? Energy_kcal { get; set; }
        public double? Carbs_g { get; set; }
        public double? Protein_g { get; set; }
        public double? Fat_g { get; set; } 
    }
}
