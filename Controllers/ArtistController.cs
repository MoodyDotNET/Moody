using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using moody.Models;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;
using moody.Extensions;

namespace moody.Controllers
{
    [Route("api/[controller]")]
    public class ArtistController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Artist> all(MoodyContext db)
        {
            return db.Artist;
        }

        [HttpGet("[action]")]
        public Artist get(MoodyContext db, int id)
        {
            return db.Artist.Where(a => a.ArtistCode == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        [AdminFilter]
        public bool insert(MoodyContext db, [FromBody]Artist artist)
        {
            Administrator admin = HttpContext.Session.Get<Administrator>("ADMIN");
            db.Artist.Add(new Artist
            {
                FirstName = artist.FirstName,
                MiddleName = artist.MiddleName,
                LastName = artist.LastName,
                Biography = artist.Biography,
                Introduce = artist.Introduce,
                Band = artist.Band,
                BirthDate = artist.BirthDate,
                ProducerCode = artist.ProducerCode,
                LastModifyAt = DateTime.Now,
                LastModifyBy = admin.UserId
            });
            db.SaveChanges();
            return true;

        }

        [HttpPut("[action]")]
        [AdminFilter]
        public bool update(MoodyContext db, [FromBody]Artist artist)
        {
            Administrator admin = HttpContext.Session.Get<Administrator>("ADMIN");
            Artist t = db.Artist.Where(a => a.ArtistCode == artist.ArtistCode).First();
            t.FirstName = artist.FirstName;
            t.MiddleName = artist.MiddleName;
            t.LastName = artist.LastName;
            t.Biography = artist.Biography;
            t.Introduce = artist.Introduce;
            t.Band = artist.Band;
            t.BirthDate = artist.BirthDate;
            t.ProducerCode = artist.ProducerCode;
            t.LastModifyAt = DateTime.Now;
            t.LastModifyBy = admin.UserId;
            db.SaveChanges();
            return true;

        }

        [HttpDelete("[action]")]
        [AdminFilter]
        public bool delete(MoodyContext db, [FromBody]Artist artist)
        {
            db.Artist.Remove(db.Artist.Where(a => a.ArtistCode == artist.ArtistCode).First());
            db.SaveChanges();
            return true;

        }

        [HttpGet("[action]")]
        public IEnumerable<Artist> lastest(MoodyContext db)
        {
            return db.Artist
                .OrderBy(a => a.BirthDate)
                .Take(6)
                .ToList(); ;
        }
    }
}
