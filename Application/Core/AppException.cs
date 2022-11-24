using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        public AppException(int statudCode, string message, string details = null)
        {
            StatudCode = statudCode;
            Message = message;
            Details = details;
        }

        public int StatudCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}