using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Data;
using Portfolio.Data.Enums;
using Portfolio.Data.Models;
using System;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
	/// <summary>
	/// Actions relating to <see cref="Data.Models.Ping"/>.
	/// </summary>
	[Route("api/v1/ping")]
	public class PingController : Controller
	{
		private readonly Context _context;

		/// <summary>
		/// Constructor.
		/// </summary>
		public PingController(Context context)
		{
			_context = context;
		}

		/// <summary>
		/// Send a ping.
		/// </summary>
		[HttpGet("")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> Ping([FromQuery] string userName = null, [FromQuery] string source = null)
		{
			var ipAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();

			_context.Add(new Ping
			{
				IpAddress = ipAddress,
				UserName = string.IsNullOrEmpty(userName) ? null : userName.ToLower(),
				Timestamp = DateTimeOffset.UtcNow,
				Source = GetPingSource(source),
			});

			await _context.SaveChangesAsync();

			return Ok();
		}

		private static PingSource? GetPingSource(string source)
		{
			if (string.IsNullOrWhiteSpace(source))
			{
				return null;
			}

			source = source.ToLower();

			switch (source)
			{
				case "portfolio":
					return PingSource.Portfolio;
				case "userlookup":
					return PingSource.UserLookup;
				default:
					return null;
			}
		}
	}
}
