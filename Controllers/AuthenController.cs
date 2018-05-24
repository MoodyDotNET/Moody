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
    public class AuthenController : Controller
    {
        [HttpGet("[action]")]
        public bool login(MoodyContext db, string username, string password) {
            bool res = false;
            Administrator admin = db.Administrator
                .Where(q => q.Username == username)
                .Where(q => q.Password == password)
                .FirstOrDefault();
            if (admin != null)
            {
                HttpContext.Session.Set<Administrator>("ADMIN", admin);
                res = true;
            }
            return res;
        }

        [HttpGet("[action]")]
        [AdminFilter]
        public Administrator current(MoodyContext db) {
            return HttpContext.Session.Get<Administrator>("ADMIN");
        }

        [HttpGet("[action]")]
        [AdminFilter]
        public bool logout(MoodyContext db) {
            HttpContext.Session.Clear();
            return true;
        }
    }
}
