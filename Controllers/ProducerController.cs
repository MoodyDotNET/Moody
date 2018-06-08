using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using moody.Models;

namespace moody.Controllers
{
    [Route("api/[controller]")]
    public class ProducerController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Producer> all(MoodyContext db)
        {
            return db.Producer;
        }
    }
}
