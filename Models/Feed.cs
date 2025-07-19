using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Feed
    {
        [Key]
        public int FeedId { get; set; }
        [Required(ErrorMessage = "Feed Name is required")]
        public required string FeedName { get; set; }
        [Required(ErrorMessage = "Type is required")]
        public required string Type { get; set; }
        [Required(ErrorMessage = "Description is required")]
        public required string Description { get; set; }
        [Required(ErrorMessage = "Quantity is required")]
        public int Quantity { get; set; }
        [Required(ErrorMessage = "Unit is required")]
        public required string Unit { get; set; }
        [Required(ErrorMessage = "Price Per Unit is required")]
        public decimal PricePerUnit { get; set; }
        [Required(ErrorMessage = "Image is required")]
        public required string Image { get; set; }
        [Required(ErrorMessage = "UserId is required")]
        public required string UserId { get; set; }
        public ApplicationUser? User { get; set; }
    }
}