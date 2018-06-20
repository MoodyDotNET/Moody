using System; 
using System.Collections.Generic; 
using System.Linq; 
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Http; 
using Microsoft.AspNetCore.Mvc; 
using moody.Models; 
using Newtonsoft.Json; 

namespace moody.Controllers {
    [Route("api/[controller]")]
    public class SongController:Controller {
        [HttpGet("[action]")]
        public IEnumerable<Song> all(MoodyContext db) {
            return db.Song;
        }

        [HttpGet("[action]")]
        public IEnumerable<Song> search(MoodyContext db, string searchField) {
            return db.Song
                .Where(s => s.Title.Contains(searchField) || s.Subtitle.Contains(searchField));
        }

        [HttpGet("[action]")]
        public Song get(MoodyContext db, int id)
        {
            return db.Song.Where(s => s.SongCode == id).FirstOrDefault();
        }
        
        [HttpPost("[action]")]
        [AdminFilter]
        public bool insert(MoodyContext db, [FromBody]Song song)
        {
            Song s = new Song {
                Title = song.Title,
                Subtitle = song.Subtitle,
                AlbumId = song.AlbumId,
                ContributingArtist = song.ContributingArtist,
                Composer = song.Composer,
                DateReleased = song.DateReleased,
                Lyric = song.Lyric
            };
            db.Song.Add(s);
            db.SaveChanges();
            foreach (var t in song.Tag)
            {
                t.SongCode = s.SongCode;
            }
            s.Tag = song.Tag;
            db.SaveChanges();
            return true;
        }
        
        [HttpPut("[action]")]
        [AdminFilter]
        public bool update(MoodyContext db, [FromBody]Song song)
        {
            Song t = db.Song.Where(a => a.SongCode == song.SongCode).First();
            t.Title = song.Title;
            t.Subtitle = song.Subtitle;
            t.AlbumId = song.AlbumId;
            t.ContributingArtist = song.ContributingArtist;
            t.Composer = song.Composer;
            t.DateReleased = song.DateReleased;
            t.Lyric = song.Lyric;
            db.SaveChanges();
            db.Tag.RemoveRange(db.Tag.Where(tag => tag.SongCode == song.SongCode));
            db.SaveChanges();
            foreach (var tag in song.Tag)
            {
                db.Tag.Add(tag);
            }
            db.SaveChanges();
            return true;
        }
        
        [HttpDelete("[action]")]
        [AdminFilter]
        public bool delete(MoodyContext db, [FromBody]Song song)
        {
            db.Tag.RemoveRange(db.Tag.Where(tag => tag.SongCode == song.SongCode));
            db.Song.Remove(db.Song.Where(a => a.SongCode == song.SongCode).First());
            db.SaveChanges();
            return true;
        }
    }
}