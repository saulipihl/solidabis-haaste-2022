namespace Solidabis_2022_backend.Services
{
    public interface IByteEncoder
    {
        public string EncodeToBase64(byte[] data);
    }

    public class ByteEncoder : IByteEncoder
    {
        public string EncodeToBase64(byte[] data)
        {
            return Convert.ToBase64String(data);
        }
    }
}
