using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Data;
using Portfolio.Data.Enums;
using Portfolio.Data.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
	[Route("api/ping")]
	class PingController : Controller
	{
		private readonly Context _context;

		/// <summary>
		/// Constructor.
		/// </summary>
		public PingController(Context context)
		{
			_context = context;
		}

		public string Index()
		{
			return "This is my default action...";
		}

		[HttpGet("v1/", Name = "PingV1")]
		[ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> Ping([FromRoute] string filename)
		{
			if (string.IsNullOrEmpty(filename))
				filename = "image.jpg";

			var path = Path.Combine("~", "Images", filename);

			return File(path, "image/jpeg");
		}

		[HttpGet("v1/{filename}", Name = "PingV1Send")]
		[ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> Send([FromRoute] string filename, [FromQuery] string username, [FromQuery] string description)
		{
			if (!string.IsNullOrEmpty(username))
			{
				_context.Add(new Ping
				{
					UserName = username.ToLower(),
					Timestamp = DateTimeOffset.UtcNow,
					Type = PingType.Neopets,
					Description = description,
				});

				await _context.SaveChangesAsync();
			}

			if (string.IsNullOrEmpty(filename))
				filename = "image.jpg";

			var path = Path.Combine("~", "Images", filename);

			return File(path, "image/jpeg");
		}
	}
}
