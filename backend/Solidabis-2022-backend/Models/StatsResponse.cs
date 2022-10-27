using System.Collections;

namespace Solidabis_2022_backend.Models
{
    /// <summary>
    /// Response object containing all necessary information regarding the foods for the fight
    /// </summary>
    public class StatsResponse
    {
        public StatsResponse(IEnumerable<ProcessedFoodData> processedFoodData)
        {
            ProcessedFoodData = processedFoodData;
        }

        public IEnumerable<ProcessedFoodData>? ProcessedFoodData { get; }
    }
}
