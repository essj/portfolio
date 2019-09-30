using Microsoft.EntityFrameworkCore;
using Portfolio.Data.Models;

namespace Portfolio.Data
{
	public class Context : DbContext
	{
		public DbSet<Ping> Pings { get; set; }

		public Context(DbContextOptions<Context> options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder.ApplyConfigurationsFromAssembly(typeof(Context).Assembly);
		}
	}
}
