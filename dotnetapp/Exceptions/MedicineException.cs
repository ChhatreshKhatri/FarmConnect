using System;

namespace dotnetapp.Exceptions
{
    public class MedicineException : Exception
    {
        public MedicineException(string message) : base(message){}
    }
}