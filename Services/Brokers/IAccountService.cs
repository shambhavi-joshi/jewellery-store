using MyTestApp.Entities;
using MyTestApp.Models;
using System.Threading.Tasks;

namespace MyTestApp.Services.Brokers
{
    public interface IAccountService
    {
        Task<User> LoginAsync(LoginModel loginDetails);
        Task<bool> LogoutAsync();
    }
}
