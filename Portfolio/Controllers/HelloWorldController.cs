using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
	/// <summary>
	/// 
	/// </summary>
	public class HelloWorldController : Controller
	{
		// 
		// GET: /HelloWorld/
		/// <summary>
		/// 
		/// </summary>
		/// <returns></returns>

		public string Index()
		{
			return "This is my default action...";
		}

		// 
		// GET: /HelloWorld/Welcome/
		/// <summary>
		/// 
		/// </summary>
		/// <returns></returns>

		public string Welcome()
		{
			return "This is the Welcome action method...";
		}
	}
}
