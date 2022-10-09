namespace Solidabis_2022_backend.Models
{
    /// <summary>
    /// After API data has been processed, this object connects the food to the stats
    /// </summary>
    public class ProcessedFoodData
    {
        public ProcessedFoodData(IncludedFood food, Stats stats)
        {
            Food = food;
            Stats = stats;
        }

        public IncludedFood Food { get; }
        public Stats Stats { get; }
    }
}
