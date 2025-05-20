using E_Commerce.Models;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Repository
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<ProductModel> Products { get; set; }
    }
}
