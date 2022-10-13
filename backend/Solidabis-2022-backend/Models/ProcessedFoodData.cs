namespace Solidabis_2022_backend.Models
{
    /// <summary>
    /// After API data has been processed, this object connects the food to the stats
    /// </summary>
    public class ProcessedFoodData
    {
        public ProcessedFoodData(IncludedFood food, Stats stats, string imageBase64)
        {
            Food = food;
            Stats = stats;
            ImageBase64 = imageBase64;
        }

        public IncludedFood Food { get; }
        public Stats Stats { get; }
        public string ImageBase64 { get; }
    }
}
