using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Data.Enums;
using Portfolio.Data.Models;
using Portfolio.Models.V1;
using System;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
	/// <summary>
	/// Actions relating to <see cref="Data.Models.Ping"/>.
	/// </summary>
	[Route("api/pings")]
	[AllowAnonymous]
	public class PingController : Controller
	{
		private readonly Context _context;
		private readonly IMapper _mapper;

		/// <summary>
		/// Constructor.
		/// </summary>
		public PingController(Context context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		private class PingControllerProfile : Profile
		{
			public PingControllerProfile()
			{
				CreateMap<Ping, PingDto>(MemberList.Source);
			}
		}

		[HttpGet("v1")]
		[ProducesResponseType(typeof(PingDto[]), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> List()
		{
			var pings = await _context.Pings
				.ProjectTo<PingDto>(_mapper.ConfigurationProvider)
				.ToArrayAsync();

			return Ok(pings);
		}

		/// <summary>
		/// Send a ping.
		/// </summary>
		[HttpGet("v1/ping")]
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
