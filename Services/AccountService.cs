using MyTestApp.Entities;
using MyTestApp.Models;
using MyTestApp.Services.Brokers;
using System.Linq;
using System.Threading.Tasks;

namespace MyTestApp.Services
{
    public class AccountService : IAccountService
    {
        private readonly StoreDbContext _context;

        public AccountService(StoreDbContext context)
        {
            _context = context;
        }

        public async Task<User> LoginAsync(LoginModel loginModel)
        {
            var user = _context.Users.FirstOrDefault(x => x.Username == loginModel.Username && x.Password == loginModel.Password);

            if (user != null)
            {
                return user;
            }

            return default;
        }

        public Task<bool> LogoutAsync()
        {
            return Task.FromResult(true);
        }
    }
}
