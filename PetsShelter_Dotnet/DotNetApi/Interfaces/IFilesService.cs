using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Interfaces
{
    public interface IFilesService
    {
        string UploadPhotoAndGetName(IPhoto itemDto);
    }
}