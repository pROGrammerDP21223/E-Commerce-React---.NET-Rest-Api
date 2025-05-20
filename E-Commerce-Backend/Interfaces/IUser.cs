using E_Commerce.Models;

namespace E_Commerce.Interfaces
{
    public interface IUser
    {
        Task Register(UserModel user);
        Task<bool> ValidateUser(UserModel user);
    }
}
