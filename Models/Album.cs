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

        public string Album1 { get; set; }
        public DateTime? DateReleased { get; set; }
        public string Genre { get; set; }
        public string CoverLink { get; set; }
        public int AlbumId { get; set; }

        public ICollection<Song> Song { get; set; }
    }
}
