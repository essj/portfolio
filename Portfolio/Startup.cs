using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Data;
using Portfolio.Data.Services;
using Portfolio.Options;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Reflection;
using IConfigurationProvider = AutoMapper.IConfigurationProvider;

namespace Portfolio
{
	/// <summary>
	/// ASP.NET Core startup.
	/// </summary>
	public class Startup
	{
		/// <summary>
		/// Constructor.
		/// </summary>
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		/// <summary>
		/// Configuration properties for this application.
		/// </summary>
		public IConfiguration Configuration { get; }

		/// <summary>
		/// This method gets called by the runtime.Use this method to add services to the container.
		/// </summary>
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc()
				.SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

			services.AddAutoMapper(Assembly.GetAssembly(typeof(Startup)));

			services.AddCors();

			// In production, the React files will be served from this directory.
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "App/build";
			});

			services.AddDbContext<Context>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

			services.AddSingleton<IDbContextFactory, DbContextFactory>();

			services.AddSwaggerGen(c =>
			{
				c.MapType<TimeSpan>(() => new Schema { Type = "string", Format = "time-span" });
				c.MapType<TimeSpan?>(() => new Schema { Type = "string", Format = "time-span" });
				c.SwaggerDoc("v1", new Info { Title = "Portfolio API", Version = "v1" });
			});
		}

		/// <summary>
		/// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		/// </summary>
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			var automapperConfiguration = app.ApplicationServices.GetRequiredService<IConfigurationProvider>();
			automapperConfiguration.AssertConfigurationIsValid();

			var corsOptions = Configuration.GetSection("Cors").Get<CorsOptions>();
			app.UseCors(builder =>
			{
				builder
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials()
					.WithOrigins(corsOptions.AllowOrigin.Split(','));
			});

			app.UseSwagger();
			app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio API"); });

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			//app.UseMvc(routes =>
			//{
			//	routes.MapRoute(
			//		name: "default",
			//		template: "{controller}/{action=Index}/{id?}");
			//});
			app.UseMvc();

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "App";

				if (env.IsDevelopment())
				{
					spa.UseReactDevelopmentServer(npmScript: "start");
				}
			});
		}
	}
}
