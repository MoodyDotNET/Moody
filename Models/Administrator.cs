using System;
using System.Collections.Generic;

namespace moody.Models
{
    public partial class Administrator
    {
        public Administrator()
        {
            Album = new HashSet<Album>();
            Artist = new HashSet<Artist>();
            Category = new HashSet<Category>();
            Member = new HashSet<Member>();
            Producer = new HashSet<Producer>();
            Song = new HashSet<Song>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? LastModifyAt { get; set; }

        public ICollection<Album> Album { get; set; }
        public ICollection<Artist> Artist { get; set; }
        public ICollection<Category> Category { get; set; }
        public ICollection<Member> Member { get; set; }
        public ICollection<Producer> Producer { get; set; }
        public ICollection<Song> Song { get; set; }
    }
}
