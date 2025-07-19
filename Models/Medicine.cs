using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Medicine
    {
        [Key]
        public int MedicineId { get; set; }
        [Required(ErrorMessage = "Medicine Name is required")]
        public required string MedicineName { get; set; }
        [Required(ErrorMessage = "Brand is required")]
        public required string Brand { get; set; }
        [Required(ErrorMessage = "Category is required")]
        public required string Category { get; set; }
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