using Portfolio.Data.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Models.V1
{
	/// <summary>
	/// <see cref="Data.Models.Ping"/>
	/// </summary>
	public class PingDto
	{
		/// <summary>
		/// Unique ID for this event.
		/// </summary>
		public Guid PingId { get; set; }

		[Required]
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
