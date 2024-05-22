using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Interfaces;

namespace DotNetApi.Services
{
    public class FilesService : IFilesService
    {

        private readonly IWebHostEnvironment webHostEnvironment;

        public FilesService(IWebHostEnvironment webHostEnvironment)
        {
            this.webHostEnvironment = webHostEnvironment;
        }

        public string UploadPhotoAndGetName(IPhoto itemDto)
        {

            IFormFile photoFile = itemDto.GetPhoto();

            string extention = Path.GetExtension(photoFile.FileName);
            string photoName = Guid.NewGuid().ToString() + extention;
            string photoPath = Path.Combine(webHostEnvironment.ContentRootPath, "Storage", photoName);
            
            using FileStream stream = new FileStream(photoPath, FileMode.Create);
            photoFile.CopyTo(stream);

            return photoName;
        }
    }
}