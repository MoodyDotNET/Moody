using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using moody.Extensions;
using moody.Models;
using Newtonsoft.Json;

namespace moody.Controllers
{
    [Route("api/[controller]")]
    public class MemberController : Controller
    {
        [HttpGet("[action]")]
        public bool login(MoodyContext db, string username, string password)
        {
            bool res = false;
            Member authen = db.Member
                .Where(q => q.Username == username)
                .Where(q => q.Password == password)
                .FirstOrDefault();
            if (authen != null)
            {
                HttpContext.Session.SetString("MEMBER",
                    JsonConvert.SerializeObject(authen, new JsonSerializerSettings()
                    {
                        PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                        Formatting = Formatting.Indented
                    }));
                res = true;
            }
            return res;
        }

        [HttpGet("[action]")]
        public Member current(MoodyContext db)
        {
            String value = HttpContext.Session.GetString("MEMBER");
            return value == null ? null : JsonConvert.DeserializeObject<Member>(value);
        }

        [HttpGet("[action]")]
        public bool logout(MoodyContext db)
        {
            HttpContext.Session.Clear();
            return true;
        }

        [HttpPost("[action]")]
        public bool insert(MoodyContext db, [FromBody]Member member)
        {
            member.Username = member.Username.Trim();
            member.Password = member.Password.Trim();
            if (member.Username == "" || member.Password == "")
            {
                return false;
            }
            if (db.Member.Any(m => m.Username == member.Username))
            {
                return false;
            }
            db.Member.Add(new Member { Username = member.Username, Password = member.Password });
            db.SaveChanges();
            return true;
        }

        [HttpPut("[action]")]
        public bool update(MoodyContext db, [FromBody]Member member)
        {
            Member logged = HttpContext.Session.Get<Member>("MEMBER");
            if (logged.UserId != member.UserId)
            {
                return false;
            }
            Member t = db.Member.Where(u => u.UserId == u.UserId).First();
            t.FirstName = member.FirstName;
            t.MiddleName = member.MiddleName;
            t.LastName = member.LastName;
            t.Password = member.Password;
            db.SaveChanges();
            HttpContext.Session.Set<Member>("MEMBER", t);
            return true;
        }

        [HttpGet("[action]")]
        public Rating getRated(MoodyContext db, int songID)
        {
            Member logged = HttpContext.Session.Get<Member>("MEMBER");
            return (logged == null) ? db.Rating.Where(r => r.SongId.Equals(songID) && r.UserId.Equals(logged.UserId)).FirstOrDefault() : null;
        }

        [HttpGet("[action]")]
        public bool rating(MoodyContext db, int songID, float score)
        {
            bool rated = false;
            Rating rate = getRated(db, songID);
            if (rate == null)
            {
                Member logged = HttpContext.Session.Get<Member>("MEMBER");
                db.Rating.Add(new Rating
                {
                    UserId = logged.UserId,
                    SongId = songID,
                    Score = score,
                });
                rated = true;
            }
            else
            {
                rate.Score = score;
            }
            db.SaveChanges();
            return rated;
        }
    }
}
