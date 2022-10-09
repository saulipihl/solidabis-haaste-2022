namespace Solidabis_2022_backend.Models
{
    /// <summary>
    /// The data object received from the Fineli API
    /// </summary>
    public class FineliFoodData
    {
        public double? alcohol { get; set; }
        public double? amount { get; set; }
        public double? carbohydrate { get; set; }
        public IEnumerable<double>? data { get; set; }
        public double? ediblePortion { get; set; }
        public double? energy { get; set; }
        public double? energyKcal { get; set; }
        public double? fat { get; set; }
        public double? fiber { get; set; }
        public FineliFoodDataInformation? functionClass { get; set; }
        public int id { get; set; }
        public FineliFoodDataInformation? ingredientClass { get; set; }
        public double? mass { get; set; }
        public FineliFoodDataLanguageMap? name { get; set; }
        public double? organicAcids { get; set; }
        public IEnumerable<FineliFoodDataInformation>? preparationMethod { get; set; }
        public double? protein { get; set; }
        public double? salt { get; set; }
        public double? saturatedFat { get; set; }
        public IEnumerable<string>? specialDiets { get; set; }
        public double? sugar { get; set; }
        public double? sugarAlcohol { get; set; }
        public IEnumerable<string>? themes { get; set; }
        public FineliFoodDataInformation? type { get; set; }
        public string? unit { get; set; }
        public IEnumerable<FineliFoodDataInformationWithMass>? units { get; set; }

        public bool IsValid()
        {
            return carbohydrate.HasValue && fat.HasValue && energyKcal.HasValue && protein.HasValue;
        }
    }

    public class FineliFoodDataInformation
    {
        public string? code { get; set; }
        public FineliFoodDataLanguageMap? description { get; set; }
        public FineliFoodDataLanguageMap? abbreviation { get; set; }
    }

    public class FineliFoodDataInformationWithMass : FineliFoodDataInformation
    {
        public double? mass { get; set; }
    }

    public class FineliFoodDataLanguageMap
    {
        public string? fi { get; set; }
        public string? sv { get; set; }
        public string? en { get; set; }
        public string? la { get; set; }
    }
}
