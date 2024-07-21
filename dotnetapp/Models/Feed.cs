using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Feed
    {
        [Key]
        public int FeedId{get; set;}
        [Required(ErrorMessage="Feed Name is required")]
        public string FeedName{get; set;}
        [Required(ErrorMessage="Type is required")]
        public string Type{get; set;}
        [Required(ErrorMessage="Description is required")]
        public string Description{get; set;}
        [Required(ErrorMessage="Quantity is required")]
        public int Quantity {get; set;}
        [Required(ErrorMessage="Unit is required")]
        public string Unit{get; set;}
        [Required(ErrorMessage="Price Per Unit is required")]
        public decimal PricePerUnit{get; set;}
        [Required(ErrorMessage="Image is required")]
        public string Image{get; set;}
        [Required(ErrorMessage="UserId is required")]
        public int UserId{get; set;}
        public User? User{get; set;}
    }
}