using System.ComponentModel.DataAnnotations;

namespace E_Commerce.Models
{
    public class ProductModel
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public int CategoryId { get; set; }

        public string ImgPath { get; set; }
        public string Description { get; set; }

        public double Price { get; set; }


    }
}
