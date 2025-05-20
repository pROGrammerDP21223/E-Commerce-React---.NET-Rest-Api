using System.ComponentModel.DataAnnotations;

namespace E_Commerce.Models
{
    public class UserModel
    {
        [Key]
        public int UserId { get; set; } 
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
