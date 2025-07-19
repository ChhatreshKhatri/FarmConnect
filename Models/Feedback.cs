using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }
        [Required(ErrorMessage = "UserId is required")]
        public required string UserId { get; set; }
        public ApplicationUser? User { get; set; }
        [Required(ErrorMessage = "Feedback Text is required")]
        public required string FeedbackText { get; set; }
        [Required(ErrorMessage = "Date is required")]
        [DataType(DataType.DateTime)]
        public DateTime Date { get; set; }
    }
}