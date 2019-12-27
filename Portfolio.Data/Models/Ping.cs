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

		public string IpAddress { get; set; }

		/// <summary>
		/// The username of the user that did this ping, if any.
		/// </summary>
		public string UserName { get; set; }

		/// <summary>
		/// When this ping event occurred.
		/// </summary>
		[Required]
		public DateTimeOffset Timestamp { get; set; }

		public PingSource? Source { get; set; }
	}
}
