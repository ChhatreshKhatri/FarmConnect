using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace dotnetapp.Models
{
    public class Request
    {
        [Key]
        public int RequestId { get; set; }

        [Required(ErrorMessage = "Request Type is required.")]
        public string RequestType { get; set; }
        public int? FeedId { get; set; }
        public Feed? Feed { get; set; }
        public int? MedicineId { get; set; }
        public Medicine? Medicine { get; set; }
        [Required(ErrorMessage = "User ID is required.")]
        // [NoAction]
        public int UserId { get; set; }
        public User? User { get; set; }
        [Required(ErrorMessage = "Livestock ID is required.")]
        public int? LivestockId { get; set; }
        public Livestock? Livestock { get; set; }
        [Required(ErrorMessage = "Quantity is required.")]
        public int Quantity { get; set; }
        [Required(ErrorMessage = "User ID is required.")]
        public string Status { get; set; }
        [Required(ErrorMessage = "RequestDate is required.")]
        [DataType(DataType.DateTime)]
        public DateTime RequestDate { get; set; }
    }
}
