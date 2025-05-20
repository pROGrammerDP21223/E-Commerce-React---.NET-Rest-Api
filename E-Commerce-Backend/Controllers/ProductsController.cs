using E_Commerce.Interfaces;
using E_Commerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProduct _service;

    public ProductController(IProduct service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _service.GetAllProductsAsync());


    [HttpGet("categories")]
    public async Task<IActionResult> GetAllCategories() =>
       Ok(await _service.GetAllCategoryAsync());


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _service.GetProductByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] ProductUploadModel model)
    {
        var result = await _service.AddProductAsync(model);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromForm] ProductUploadModel model)
    {
        var updated = await _service.UpdateProductAsync(id, model);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteProductAsync(id);
        return deleted ? Ok("Deleted") : NotFound();
    }
}
