using System;
using System.Collections.Generic;

namespace moody.Models
{
    public partial class Artist
    {
        public Artist()
        {
            InverseBandNavigation = new HashSet<Artist>();
            SongComposerNavigation = new HashSet<Song>();
            SongContributingArtistNavigation = new HashSet<Song>();
        }

        public int ArtistCode { get; set; }
        public bool Available { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Biography { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Introduce { get; set; }
        public string CoverLink { get; set; }
        public int? ProducerCode { get; set; }
        public DateTime? LastModifyAt { get; set; }
        public int? LastModifyBy { get; set; }
        public int? Band { get; set; }

        public Artist BandNavigation { get; set; }
        public Administrator LastModifyByNavigation { get; set; }
        public Producer ProducerCodeNavigation { get; set; }
        public ICollection<Artist> InverseBandNavigation { get; set; }
        public ICollection<Song> SongComposerNavigation { get; set; }
        public ICollection<Song> SongContributingArtistNavigation { get; set; }
    }
}
