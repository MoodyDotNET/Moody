using System; 
using System.Collections.Generic; 
using System.Linq; 
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Http; 
using Microsoft.AspNetCore.Mvc; 
using moody.Models; 
using Newtonsoft.Json; 

namespace moody.Controllers {
    [Route("api/[controller]")]
    public class ProfileController:Controller {
    [HttpGet("[action]")]
        public bool changeImg(MoodyContext db) {
            return true; 
        }
    }
}