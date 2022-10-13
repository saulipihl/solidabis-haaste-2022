using Microsoft.AspNetCore.Mvc;
using Solidabis_2022_backend.Models;
using Solidabis_2022_backend.Services;
using System.Text.Json;

namespace Solidabis_2022_backend.Controllers
{
    /// <summary>
    /// API to get the food stats
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IFineliApiService _foodDataApiService;
        private readonly IImageLoader imageLoader;
        private readonly IByteEncoder byteEncoder;

        public FoodController(
            IConfiguration configuration,
            IFineliApiService foodDataApiService,
            IImageLoader imageLoader,
            IByteEncoder byteEncoder
        )
        {
            this.configuration = configuration;
            _foodDataApiService = foodDataApiService;
            this.imageLoader = imageLoader;
            this.byteEncoder = byteEncoder;
        }

        /// <summary>
        /// Used to fetch the food data from the Fineli API
        /// </summary>
        /// <returns></returns>
        [HttpGet("get-stats-fineli")]
        public async Task<StatsResponse> GetStatsFineli()
        {
            // Get included food from the appsettings.json
            var includedFood = configuration.GetSection("IncludedFood").Get<IncludedFood[]>();
            if (includedFood == null)
            {
                return new StatsResponse(new List<ProcessedFoodData>());
            }

            // Fetch nutrition values from api
            List<ProcessedFoodData> processedFoodData = new();
            foreach (var food in includedFood)
            {
                try
                {
                    var fineliApiFoodData = await _foodDataApiService.FetchFoodDataAsync(food.FineliId);
                    if (fineliApiFoodData == null || !fineliApiFoodData.IsValid())
                        continue;

                    // Map the nutrition values to to stats
                    var nutritionValues = new NutritionValues(fineliApiFoodData);
                    var stats = new Stats(nutritionValues);

                    // Load the image and encode it
                    var imageBytes = await imageLoader.LoadImageAsync(food.FileName);
                    var encodedImage = byteEncoder.EncodeToBase64(imageBytes);

                    processedFoodData.Add(new ProcessedFoodData(food, stats, encodedImage));
                } catch (Exception)
                {
                    continue;
                }
            }

            return new StatsResponse(processedFoodData);
        }
    }
}