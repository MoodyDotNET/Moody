using System;
using System.Collections.Generic;

namespace moody.Model
{
    public partial class Tag
    {
        public int TagCode { get; set; }
        public int SongCode { get; set; }

        public Song SongCodeNavigation { get; set; }
        public Category TagCodeNavigation { get; set; }
    }
}
