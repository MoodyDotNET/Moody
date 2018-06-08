using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using moody.Models;

namespace moody.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Category> all(MoodyContext db)
        {
            return db.Category;
        }
    }
}
