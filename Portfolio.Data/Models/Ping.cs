using Portfolio.Data.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Data.Models
{
	public class Ping
	{
		/// <summary>
		/// Unique ID for this event.
		/// </summary>
		[Key]
		public Guid PingId { get; set; }

		/// <summary>
		/// The username of the user that did this ping.
		/// </summary>
		[Required]
		public string UserName { get; set; }

		/// <summary>
		/// When this ping event occurred.
		/// </summary>
		[Required]
		public DateTimeOffset Timestamp { get; set; }

		[Required]
		public PingType Type { get; set; }

		public string IpAddress { get; set; }

		public string Description { get; set; }
	}
}
