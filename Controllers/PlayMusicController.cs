﻿using System; 
using System.Collections.Generic; 
using System.Linq; 
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Http; 
using Microsoft.AspNetCore.Mvc; 
using moody.Models; 
using Newtonsoft.Json; 

namespace moody.Controllers {
    [Route("api/[controller]")]
    public class PlayMusicController:Controller {
        [HttpGet("[action]")]
        public IEnumerable<Song> getSong(MoodyContext db, string searchField) {
            return db.Song
                .Where(s => s.Title.Contains(searchField) || s.Subtitle.Contains(searchField));
        }
    }
}