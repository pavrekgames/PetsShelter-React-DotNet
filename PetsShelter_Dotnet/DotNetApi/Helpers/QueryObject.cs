using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Helpers
{
    public class QueryObject
    {
        public string? Name { get; set; } = null;
        public string? Species { get; set; } = null;
        public string? Race { get; set; } = null;
        public string? Size { get; set; } = null;
        public string? SortBy { get; set; } = null;
        public bool IsDescending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 2;
    }
}