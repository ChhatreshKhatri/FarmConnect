using System;

namespace dotnetapp.Exceptions
{
    public class FeedException : Exception
    {
        public FeedException(string message) : base (message){}
    }
}