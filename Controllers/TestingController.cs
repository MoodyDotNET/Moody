using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using moody.Model;

namespace moody.Controllers
{
    [Route("api/[controller]")]
    public class TestingController : Controller
    {
        [HttpGet("[action]")]
        public bool newAdmin(MoodyContext db)
        {
            db.Administrator.Add(new Administrator {Username = "nguyenhongphat0", Password = "hongphat", Available = true});
            db.SaveChanges();
            return true;
        }
        
        [HttpGet("[action]")]
        public IEnumerable<Administrator> allAdmin(MoodyContext db)
        {
            return db.Administrator;
        }
    }
}
