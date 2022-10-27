namespace Solidabis_2022_backend.Models
{
    /// <summary>
    /// The data object received from the Fineli API
    /// </summary>
    public class FineliFoodData
    {
        public double? carbohydrate { get; set; }
        public double? energyKcal { get; set; }
        public double? fat { get; set; }
        public double? protein { get; set; }

        public bool IsValid()
        {
            return carbohydrate.HasValue && fat.HasValue && energyKcal.HasValue && protein.HasValue;
        }
    }
}
