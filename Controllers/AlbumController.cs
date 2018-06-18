using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        
        [HttpGet("[action]")]
        public Album get(MoodyContext db, int id){
            return db.Album.Where(a => a.AlbumId == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        [AdminFilter]
        public bool insert(MoodyContext db, [FromBody]Album album)
        {
            db.Album.Add(new Album {Album1=album.Album1, Genre=album.Genre, DateReleased=album.DateReleased});
            db.SaveChanges();
            return true;
        }
        
        [HttpPut("[action]")]
        [AdminFilter]
        public bool update(MoodyContext db, [FromBody]Album album)
        {
            Album t = db.Album.Where(a => a.AlbumId == album.AlbumId).First();
            t.Album1 = album.Album1;
            t.Genre = album.Genre;
            t.DateReleased = album.DateReleased;
            db.SaveChanges();
            return true;
        }
        
        [HttpDelete("[action]")]
        [AdminFilter]
        public bool delete(MoodyContext db, [FromBody]Album album)
        {
            db.Album.Remove(db.Album.Where(a => a.AlbumId == album.AlbumId).First());
            db.SaveChanges();
            return true;
        }
    }
}
