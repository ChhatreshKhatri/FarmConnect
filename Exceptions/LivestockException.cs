using System;

namespace dotnetapp.Exceptions
{
    public class LivestockException : Exception
    {
        public LivestockException(string message) : base(message){}
    }
}