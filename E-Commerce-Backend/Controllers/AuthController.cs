using E_Commerce.Models;
using E_Commerce.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using E_Commerce.Interfaces;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUser _userService;

        public AuthController(IConfiguration config, IUser userService)
        {
            _config = config;
            _userService = userService;
        }

        // Register a new user (password hashed)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserModel user)
        {
            try
            {
                await _userService.Register(user);
                return Ok("User registered successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error registering user: {ex.Message}");
            }
        }

        // Login and issue a JWT token
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserModel user)
        {
            if (!await _userService.ValidateUser(user))
                return Unauthorized("Invalid username or password.");

            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return Ok(new { token = jwt });
        }
    }
}
