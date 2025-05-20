using E_Commerce.Models;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Interfaces
{
    using E_Commerce.Models;

    public interface IProduct
    {
        Task<IEnumerable<ProductModel>> GetAllProductsAsync();
        Task<IEnumerable<CategoryModel>> GetAllCategoryAsync();
        Task<ProductModel> GetProductByIdAsync(int id);
        Task<ProductModel> AddProductAsync(ProductUploadModel model);
        Task<ProductModel> UpdateProductAsync(int id, ProductUploadModel model);
        Task<bool> DeleteProductAsync(int id);
    }

}
