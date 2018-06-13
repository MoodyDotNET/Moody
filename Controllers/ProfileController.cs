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

namespace moody.Controllers {
    [Route("api/[controller]")]
    public class ProfileController:Controller {
    [HttpPut("[action]")]
        public string changeImg() {
            // string serverLink = @"wwwroot/img";
            // var thefile = Request.Form["thefile"];
            // string imgName = image.FileName.ToString();

            // String path = Server.MapPath("~/ImageStorage");//Path

            // //Check if directory exist
            // if (!System.IO.Directory.Exists(path))
            // {
            //     System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
            // }

            // //sets the image path
            // string imgPath = Path.Combine(path, imgName);

            // //get the size in bytes that
            // int imgSize = image.PostedFile.ContentLength;


            // if (image.PostedFile != null)
            // {

            //     if (image.PostedFile.ContentLength > 0)//Check if image is greater than 5MB
            //     {
            //         //Save image to the Folder
            //         image.SaveAs(imgPath);
            //         //also save image path to database
            //         //......
            //     }

            // }
            return "``";
        }
    }
}