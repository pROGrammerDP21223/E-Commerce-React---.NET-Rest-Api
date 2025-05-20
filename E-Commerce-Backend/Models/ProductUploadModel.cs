namespace E_Commerce.Models
{
    public class ProductUploadModel
    {
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public IFormFile Image { get; set; } // File from frontend
    }
}
