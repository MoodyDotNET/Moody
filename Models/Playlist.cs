using System;
using System.Collections.Generic;

namespace moody.Models
{
    public partial class Playlist
    {
        public int SongId { get; set; }
        public int UserId { get; set; }

        public Song Song { get; set; }
        //public Member User { get; set; }
    }
}
