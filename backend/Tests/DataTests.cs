using Moq;
using Solidabis_2022_backend.Models;

namespace Tests
{
    public class DataTests
    {
        [Fact]
        public void FoodData_IsValid()
        {
            var foodData = GetMockFoodData();
            Assert.True(foodData.IsValid());
        }

        [Fact]
        public void FoodData_IsNotValid()
        {
            var foodData1 = GetMockFoodData();
            foodData1.fat = null;
            Assert.False(foodData1.IsValid());

            var foodData2 = GetMockFoodData();
            foodData2.protein = null;
            Assert.False(foodData2.IsValid());

            var foodData3 = GetMockFoodData();
            foodData3.energyKcal = null;
            Assert.False(foodData3.IsValid());

            var foodData4 = GetMockFoodData();
            foodData4.carbohydrate = null;
            Assert.False(foodData4.IsValid());
        }

        internal FineliFoodData GetMockFoodData()
        {
			var data = new Mock<FineliFoodData>();
            data.Object.fat = 0.100000001490116;
            data.Object.protein = 0.189999997615814;
            data.Object.energyKcal = 40.51256614975584;
            data.Object.carbohydrate = 8.3100004196167;
            return data.Object;
        }
    }
}