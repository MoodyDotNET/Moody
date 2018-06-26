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
    public class UploadController : Controller
    {
        private readonly IHostingEnvironment Environment;

        public UploadController(IHostingEnvironment environment)
        {
            Environment = environment;
        }

        [HttpPut]
        public string Index(string filename)
        {
            if (HttpContext.Request.Form.Files != null)
            {
                var files = HttpContext.Request.Form.Files;
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        filename = Environment.WebRootPath + $@"/{filename}";
                        using (FileStream fs = System.IO.File.Create(filename))
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