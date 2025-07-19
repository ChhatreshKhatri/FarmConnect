using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace dotnetapp.Models
{
    public class Livestock
    {
        [Key]
        public int LivestockId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Species is required.")]
        public required string Species { get; set; }

        [Required(ErrorMessage = "Age is required.")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Breed is required.")]
        public required string Breed { get; set; }
        public string? HealthCondition { get; set; }

        [Required(ErrorMessage = "Location is required.")]
        public required string Location { get; set; }

        [Required(ErrorMessage = "Vaccination Status is required.")]
        public required string VaccinationStatus { get; set; }
        [Required(ErrorMessage = "UserId is required.")]
        public required string UserId { get; set; }
        public ApplicationUser? User { get; set; }
    }
}