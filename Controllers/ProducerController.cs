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
        
        [HttpPost("[action]")]
        [AdminFilter]
        public bool insert(MoodyContext db, [FromBody]Producer producer)
        {
            db.Producer.Add(new Producer {
                CompanyName = producer.CompanyName,
                Owner = producer.Owner,
                Address = producer.Address,
            });
            db.SaveChanges();
            return true;
        }
        
        [HttpPut("[action]")]
        [AdminFilter]
        public bool update(MoodyContext db, [FromBody]Producer producer)
        {
            Producer t = db.Producer.Where(a => a.ProducerCode == producer.ProducerCode).First();
            t.CompanyName = producer.CompanyName;
            t.Owner = producer.Owner;
            t.Address = producer.Address;
            db.SaveChanges();
            return true;
        }
        
        [HttpDelete("[action]")]
        [AdminFilter]
        public bool delete(MoodyContext db, [FromBody]Producer producer)
        {
            db.Producer.Remove(db.Producer.Where(a => a.ProducerCode == producer.ProducerCode).First());
            db.SaveChanges();
            return true;
        }
    }
}
