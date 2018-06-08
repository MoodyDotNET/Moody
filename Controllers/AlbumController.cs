using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using moody.Models;

namespace moody.Controllers
{
    [Route("api/[controller]")]
    public class AlbumController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Album> all(MoodyContext db)
        {
            return db.Album;
        }
        
        [HttpPost("[action]")]
        [AdminFilter]
        public bool insert(MoodyContext db, Album album)
        {
            db.Album.Add(album);
            db.SaveChanges();
            return true;
        }
        
        [HttpPut("[action]")]
        [AdminFilter]
        public bool update(MoodyContext db, Album album)
        {
            db.Update(album);
            db.SaveChanges();
            return true;
        }
        
        [HttpDelete("[action]")]
        [AdminFilter]
        public bool delete(MoodyContext db, Album album)
        {
            db.Remove(album);
            db.SaveChanges();
            return true;
        }
    }
}
