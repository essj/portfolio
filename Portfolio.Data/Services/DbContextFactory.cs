using Microsoft.Extensions.DependencyInjection;
using System;

namespace Portfolio.Data.Services
{
	/// <summary>
	/// Responsible for getting DbContexts for non-scoped services.
	/// </summary>
	public interface IDbContextFactory
	{
		/// <summary>
		/// Creates and returns a DbContext. Ensure you using()
		/// </summary>
		ScopedDbContext GetContext();
	}
	public class ScopedDbContext : IDisposable
	{
		public Context Context { get; private set; }

		private IServiceScope _scope;

		/// <summary>
		/// Constructor.
		/// </summary>
		public ScopedDbContext(IServiceScope scope, Context context)
		{
			Context = context;
			_scope = scope;
		}

		/// <inheritdoc />
		public void Dispose()
		{
			// Disposing the scope disposes the context.
			// We don't dispose the context directly as if it is not owned directly we shouldn't dispose it.
			_scope?.Dispose();
			_scope = null;
		}
	}

	/// <summary>
	/// Resolves DbContexts from an IServiceProvider.
	/// </summary>
	public class DbContextFactory : IDbContextFactory
	{
		private readonly IServiceProvider _serviceProvider;

		/// <summary>
		/// Constructor.
		/// </summary>
		public DbContextFactory(IServiceProvider serviceProvider)
		{
			_serviceProvider = serviceProvider;
		}

		/// <inheritdoc />
		public ScopedDbContext GetContext()
		{
			var scope = _serviceProvider.CreateScope();
			var context = scope.ServiceProvider.GetService<Context>();

			return new ScopedDbContext(scope, context);
		}
	}

	/// <summary>
	/// IDbContextFactory that always returns the same context.
	/// </summary>
	public class DirectDbContextFactory : IDbContextFactory
	{
		private readonly Context _context;

		/// <summary>
		/// Constructor.
		/// </summary>
		public DirectDbContextFactory(Context context)
		{
			_context = context;
		}

		/// <inheritdoc />
		public ScopedDbContext GetContext()
		{
			return new ScopedDbContext(null, _context);
		}
	}
}
