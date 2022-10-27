using Microsoft.Extensions.Caching.Memory;
using Solidabis_2022_backend.Models;
using System.Text.Json;

namespace Solidabis_2022_backend.Services
{
    public interface IFineliApiService
    {
        /// <summary>
        /// For given food id, get the data from the Fineli API
        /// </summary>
        /// <param name="foodId">Fineli API food ID</param>
        /// <returns></returns>
        public Task<FineliFoodData?> FetchFoodDataAsync(int foodId);
    }

    public class FineliApiService : IFineliApiService
    {
        private readonly string fineliApiAddress = "https://fineli.fi/fineli/api/v1/foods/";
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;

        public FineliApiService(IHttpClientFactory httpClientFactory, IMemoryCache memoryCache)
        {
            _httpClient = httpClientFactory.CreateClient();
            _cache = memoryCache;
        }

        public async Task<FineliFoodData?> FetchFoodDataAsync(int foodId)
        {
            var url = fineliApiAddress + foodId;
            var dataFound = _cache.TryGetValue(url, out var cacheFoodData);
            if (dataFound)
                return (FineliFoodData?)cacheFoodData;
            
            var request = new HttpRequestMessage(
                HttpMethod.Get,
                url
                );
            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                using var contentStream = await response.Content.ReadAsStreamAsync();
                var foodData = await JsonSerializer.DeserializeAsync<FineliFoodData>(contentStream);
                _cache.Set(url, foodData);
                return foodData;
            } else
            {
                throw new Exception($"No food data found for {foodId}");
            }
        }
    }
}
