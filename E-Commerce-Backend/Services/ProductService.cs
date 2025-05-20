using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Repository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

public class ProductService : IProduct
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _env;

    public ProductService(ApplicationDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    public async Task<IEnumerable<ProductModel>> GetAllProductsAsync()
    {
        return await _context.Products.ToListAsync();
    }
    public async Task<IEnumerable<CategoryModel>> GetAllCategoryAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<ProductModel> GetProductByIdAsync(int id)
    {
        return await _context.Products.FindAsync(id);
    }

    public async Task<ProductModel> AddProductAsync(ProductUploadModel model)
    {
        string filePath = null;
        if (model.Image != null)
        {
            var uploadsDir = Path.Combine(_env.WebRootPath, "images");
            Directory.CreateDirectory(uploadsDir);
            var fileName = Guid.NewGuid() + Path.GetExtension(model.Image.FileName);
            filePath = Path.Combine("/images/", fileName);
            using var stream = new FileStream(Path.Combine(uploadsDir, fileName), FileMode.Create);
            await model.Image.CopyToAsync(stream);
        }

        var product = new ProductModel
        {
            ProductName = model.ProductName,
            CategoryId = model.CategoryId,
            Description = model.Description,
            Price = model.Price,
            ImgPath = filePath
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return product;
    }

    public async Task<ProductModel> UpdateProductAsync(int id, ProductUploadModel model)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return null;

        product.ProductName = model.ProductName;
        product.CategoryId = model.CategoryId;
        product.Description = model.Description;
        product.Price = model.Price;

        if (model.Image != null)
        {
            var uploadsDir = Path.Combine(_env.WebRootPath, "images");
            var fileName = Guid.NewGuid() + Path.GetExtension(model.Image.FileName);
            product.ImgPath = Path.Combine("/images/", fileName);
            using var stream = new FileStream(Path.Combine(uploadsDir, fileName), FileMode.Create);
            await model.Image.CopyToAsync(stream);
        }

        _context.Products.Update(product);
        await _context.SaveChangesAsync();

        return product;
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return false;

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return true;
    }
}
