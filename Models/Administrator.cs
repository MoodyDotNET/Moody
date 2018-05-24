using System;
using System.Collections.Generic;

namespace moody.Models
{
    public partial class Administrator
    {
        public Administrator()
        {
            Artist = new HashSet<Artist>();
            InverseLastModifyByNavigation = new HashSet<Administrator>();
            Producer = new HashSet<Producer>();
            Song = new HashSet<Song>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string MiidleName { get; set; }
        public string LastName { get; set; }
        public bool Available { get; set; }
        public DateTime? LastModifyAt { get; set; }
        public int? LastModifyBy { get; set; }

        public Administrator LastModifyByNavigation { get; set; }
        public ICollection<Artist> Artist { get; set; }
        public ICollection<Administrator> InverseLastModifyByNavigation { get; set; }
        public ICollection<Producer> Producer { get; set; }
        public ICollection<Song> Song { get; set; }
    }
}
