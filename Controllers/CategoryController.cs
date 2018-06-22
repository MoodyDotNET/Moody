using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using moody.Extensions;
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

        [HttpPost("[action]")]
        [AdminFilter]
        public bool insert(MoodyContext db, [FromBody]Category category)
        {
            try
            {
                Administrator admin = HttpContext.Session.Get<Administrator>("ADMIN");
                db.Category.Add(new Category
                {
                    TagName = category.TagName,
                    LastModifyAt = DateTime.Now,
                    LastModifyBy = admin.UserId
                });
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        [HttpPut("[action]")]
        [AdminFilter]
        public bool update(MoodyContext db, [FromBody]Category category)
        {
            try
            {
                Administrator admin = HttpContext.Session.Get<Administrator>("ADMIN");
                Category t = db.Category.Where(c => c.TagCode == category.TagCode).First();
                t.TagName = category.TagName;
                t.LastModifyAt = DateTime.Now;
                t.LastModifyBy = admin.UserId;
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        [HttpDelete("[action]")]
        [AdminFilter]
        public bool delete(MoodyContext db, [FromBody]Category category)
        {
            try
            {
            db.Category.Remove(db.Category.Where(c => c.TagCode == category.TagCode).First());
            db.SaveChanges();
            return true;
            } catch (Exception e)
            {
                return false;
            }
        }
    }
}
