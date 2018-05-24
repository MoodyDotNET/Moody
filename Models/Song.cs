using System;
using System.Collections.Generic;

namespace moody.Models
{
    public partial class Song
    {
        public Song()
        {
            RatingNavigation = new HashSet<Rating>();
            Tag = new HashSet<Tag>();
        }

        public int SongCode { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public double Rating { get; set; }
        public int ListeningFrequency { get; set; }
        public int ContributingArtist { get; set; }
        public int? AlbumId { get; set; }
        public DateTime? DateReleased { get; set; }
        public DateTime? LastModifyAt { get; set; }
        public int? LastModifyBy { get; set; }
        public int Composer { get; set; }
        public string LyricCode { get; set; }
        public string CoverLink { get; set; }
        public bool Available { get; set; }
        public TimeSpan? Length { get; set; }

        public Album Album { get; set; }
        public Artist ComposerNavigation { get; set; }
        public Artist ContributingArtistNavigation { get; set; }
        public Administrator LastModifyByNavigation { get; set; }
        public ICollection<Rating> RatingNavigation { get; set; }
        public ICollection<Tag> Tag { get; set; }
    }
}
