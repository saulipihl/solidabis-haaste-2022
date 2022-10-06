using Microsoft.AspNetCore.Mvc;
using Solidabis_2022_backend.Models;

namespace Solidabis_2022_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FoodController : ControllerBase
    {
        public FoodController()
        {
        }

        [HttpGet(Name = "GetStats")]
        public IEnumerable<Stats> Get()
        {
            // Fetch nutrition values from api
            // Process those values
            return Array.Empty<Stats>();
        }
    }
}