using System; 
using System.Collections.Generic; 
using System.Linq; 
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Http; 
using Microsoft.AspNetCore.Mvc; 
using moody.Models; 
using Newtonsoft.Json; 

namespace moody.Controllers {
    [Produces("application/json")]
    [Route("api/PlayMusic")]
    public class PlayMusicController:Controller {
        public IEnumerable<Song> getSong(MoodyContext db, string searchField) {
            List < Song > songs = new List < Song > (); 
            songs.Add(db.Song
                .Where(s => s.Title.Contains(searchField) || s.Subtitle.Contains(searchField))
                // .Where(s => s.Subtitle == searchField)
                .FirstOrDefault()
                );
            return songs;

        }
    }
}