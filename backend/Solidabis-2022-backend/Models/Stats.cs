namespace Solidabis_2022_backend.Models
{
    public class Stats
    {
        public Stats(NutritionValues nutritionValues)
        {
            Health = nutritionValues.Energy_kcal;
            Attack = nutritionValues.Carbs_g;
            Defence = nutritionValues.Protein_g;
            Delay = Attack + Defence + nutritionValues.Fat_g;
        }

        public int Health { get; set; }
        public int Attack { get; set; }
        public int Defence { get; set; }
        public int Delay { get; set; }
    }
}
