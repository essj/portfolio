using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Portfolio
{
	/// <summary>
	/// Startup.
	/// </summary>
	public class Program
	{
		/// <summary>
		/// Startup.
		/// </summary>
		public static void Main(string[] args)
		{
			CreateWebHostBuilder(args).Build().Run();
		}

		private static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>();
	}
}
