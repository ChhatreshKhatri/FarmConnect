using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models{
    public class Feedback{
        [Key]
        public int FeedbackId{get; set;}
        [Required(ErrorMessage="UserId is required")]
        public int UserId{get; set;}
        public User? User{get; set;}
        [Required(ErrorMessage="Feedback Text is required")]
        public string FeedbackText{get; set;}
        [Required(ErrorMessage="Date is required")]
        [DataType(DataType.DateTime)]
        public DateTime Date{get; set;}
    }
}