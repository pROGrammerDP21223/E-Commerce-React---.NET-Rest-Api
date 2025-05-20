using System.ComponentModel.DataAnnotations;

namespace E_Commerce.Models
{
    public class CategoryModel
    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
