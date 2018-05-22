using System;
using System.Collections.Generic;

namespace moody.Model
{
    public partial class Rating
    {
        public int UserId { get; set; }
        public int SongId { get; set; }
        public double Score { get; set; }

        public Song Song { get; set; }
        public Member User { get; set; }
    }
}
