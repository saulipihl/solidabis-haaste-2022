namespace Solidabis_2022_backend.Services
{
    public interface IImageLoader
    {
        Task<byte[]> LoadImageAsync(string filename);
    }

    public class ImageLoader : IImageLoader
    {
        public async Task<byte[]> LoadImageAsync(string filename)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Assets", "Images", $"{filename}.png");
            return await File.ReadAllBytesAsync(filePath);
        }
    }
}
