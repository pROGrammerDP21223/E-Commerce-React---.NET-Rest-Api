using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Services
{
    public class UserService : IUser
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<UserModel> _hasher;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
            _hasher = new PasswordHasher<UserModel>();
        }

        // Register a user and store the hashed password in the database
        public async Task Register(UserModel user)
        {
            // Check if the user already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
            if (existingUser != null)
                throw new Exception("User already exists.");

            // Hash the password before saving it to the database
            user.Password = _hasher.HashPassword(user, user.Password);

            // Add the user to the database
            await _context.Users.AddAsync(user);
            Console.WriteLine("Saving to database...");
            await _context.SaveChangesAsync();
            Console.WriteLine("Saved successfully.");
        }

        // Validate a user by comparing hashed passwords
        public async Task<bool> ValidateUser(UserModel user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
            if (existingUser == null)
                return false;

            // Verify the hashed password
            var result = _hasher.VerifyHashedPassword(user, existingUser.Password, user.Password);
            return result == PasswordVerificationResult.Success;
        }
    }

}
