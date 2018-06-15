using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using moody.Models;
using Newtonsoft.Json;
using System.IO;
using System.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Net.Http.Headers;

namespace moody.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController : Controller
    {
        private readonly IHostingEnvironment _environment;

        public ProfileController(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPut("[action]")]
        public string changeImg(string filename)
        {
            var newFileName = string.Empty;
            string PathDB = string.Empty;
            string[] tmp = new string[10];
            if (HttpContext.Request.Form.Files != null)
            {
                var files = HttpContext.Request.Form.Files;

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        filename = Path.Combine(_environment.WebRootPath, "img") + $@"\{filename}.jpg";

                        using (FileStream fs = System.IO.File.Open(filename, FileMode.Create))
                        {
                            file.CopyTo(fs);
                            fs.Flush();
                        }
                    }
                }
            }
            return filename;
        }
    }
}