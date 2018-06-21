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
    public class AdminController : Controller
    {
        [HttpGet("[action]")]
        public bool login(MoodyContext db, string username, string password)
        {
            bool res = false;
            Administrator authen = db.Administrator
                .Where(q => q.Username == username)
                .Where(q => q.Password == password)
                .FirstOrDefault();
            if (authen != null)
            {
                HttpContext.Session.SetString("ADMIN", JsonConvert.SerializeObject(authen, new JsonSerializerSettings()
                {
                    PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                    Formatting = Formatting.Indented
                }));
                res = true;
            }
            return res;
        }

        [HttpGet("[action]")]
        public Administrator current(MoodyContext db)
        {
            String value = HttpContext.Session.GetString("ADMIN");
            return value == null ? null : JsonConvert.DeserializeObject<Administrator>(value);
        }

        [HttpGet("[action]")]
        public bool logout(MoodyContext db)
        {
            HttpContext.Session.Clear();
            return true;
        }

        [HttpPut("[action]")]
        public bool update(MoodyContext db, [FromBody]Administrator member)
        {
            Administrator logged = HttpContext.Session.Get<Administrator>("ADMIN");
            if (logged.UserId != member.UserId)
            {
                return false;
            }
            Administrator t = db.Administrator.Where(a => a.UserId == a.UserId).First();
            t.FirstName = member.FirstName;
            t.MiddleName = member.MiddleName;
            t.LastName = member.LastName;
            t.Password = member.Password;
            t.LastModifyAt = DateTime.Now;
            db.SaveChanges();
            HttpContext.Session.Set<Administrator>("ADMIN", t);
            return true;
        }
    }
}
