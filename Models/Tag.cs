using System;
using System.Collections.Generic;

namespace moody.Models
{
    public partial class Tag
    {
        public int TagCode { get; set; }
        public int SongCode { get; set; }

        public Song SongCodeNavigation { get; set; }
        public Category TagCodeNavigation { get; set; }
    }
}
