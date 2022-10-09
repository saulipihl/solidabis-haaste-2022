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
        public FineliApiService(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        public async Task<FineliFoodData?> FetchFoodDataAsync(int foodId)
        {
            var request = new HttpRequestMessage(
                HttpMethod.Get,
                fineliApiAddress + foodId
                );
            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                using var contentStream = await response.Content.ReadAsStreamAsync();
                return await JsonSerializer.DeserializeAsync<FineliFoodData>(contentStream);
            } else
            {
                throw new Exception($"No food data found for {foodId}");
            }
        }
    }
}
