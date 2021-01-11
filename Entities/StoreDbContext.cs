using Microsoft.EntityFrameworkCore;

namespace MyTestApp.Entities
{
    public class StoreDbContext : DbContext
    {
        public StoreDbContext(DbContextOptions<StoreDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
