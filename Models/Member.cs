using System;
using System.Collections.Generic;

namespace moody.Models
{
    public partial class Member
    {
        public Member()
        {
            Playlist = new HashSet<Playlist>();
            Rating = new HashSet<Rating>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int? LastModifyBy { get; set; }
        public DateTime? LastModifyAt { get; set; }

        public Administrator LastModifyByNavigation { get; set; }
        public ICollection<Playlist> Playlist { get; set; }
        public ICollection<Rating> Rating { get; set; }
    }
}
