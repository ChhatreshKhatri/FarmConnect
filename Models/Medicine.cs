using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
 
namespace dotnetapp.Models
{
         public class Medicine
     {
        [Key]
        public int MedicineId { get; set; }
        [Required(ErrorMessage="Medicine Name is required")]
        public string MedicineName { get; set; }
        [Required(ErrorMessage="Brand is required")]
        public string Brand { get; set; }
        [Required(ErrorMessage="Category is required")]
        public string Category { get; set; }
        [Required(ErrorMessage="Description is required")]
        public string Description { get; set; }
        [Required(ErrorMessage="Quantity is required")]
        public int Quantity { get; set; }
        [Required(ErrorMessage="Unit is required")]
        public string Unit{get;set;}
        [Required(ErrorMessage="Price Per Unit is required")]
        public decimal PricePerUnit{ get; set; }
        [Required(ErrorMessage="Image is required")]
        public string Image { get; set; }
        [Required(ErrorMessage="UserId is required")]
        public  int UserId{get;set;}
        public User? User{get;set;}
    }
}