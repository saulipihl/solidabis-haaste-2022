namespace Solidabis_2022_backend.Models
{
    /// <summary>
    /// Stats used in the food battle
    /// </summary>
    public class Stats
    {
        public Stats(NutritionValues nutritionValues)
        {
            Health = nutritionValues.Energy_kcal.GetValueOrDefault();
            Attack = nutritionValues.Carbs_g.GetValueOrDefault();
            Defence = nutritionValues.Protein_g.GetValueOrDefault();
            Delay = Attack + Defence + nutritionValues.Fat_g.GetValueOrDefault();
        }

        public double Health { get; set; }
        public double Attack { get; set; }
        public double Defence { get; set; }
        public double Delay { get; set; }
    }
}
