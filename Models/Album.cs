using System;
using System.Collections.Generic;

namespace moody.Models
{
    public partial class Album
    {
        public Album()
        {
            Song = new HashSet<Song>();
        }

        public int AlbumId { get; set; }
        public string AlbumName { get; set; }
        public DateTime? DateReleased { get; set; }
        public string Genre { get; set; }
        public DateTime? LastModifyAt { get; set; }
        public int? LastModifyBy { get; set; }

        public Administrator LastModifyByNavigation { get; set; }
        public ICollection<Song> Song { get; set; }
    }
}
