using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Services;
using dotnetapp.Models;
using Microsoft.AspNetCore.Authorization;
using dotnetapp.Exceptions;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/medicine")]
    [Authorize]
    public class MedicineController : ControllerBase
    {
        private readonly MedicineService _medicineService;

        public MedicineController(MedicineService medicineService)
        {
            _medicineService = medicineService;
        }

        [HttpGet]
        [Authorize(Roles = "Supplier,Owner")]
        public async Task<ActionResult<IEnumerable<Medicine>>> GetAllMedicines()
        {
            try
            {
                var medicines = await _medicineService.GetAllMedicines();
                return Ok(medicines);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("{medicineId}")]
        [Authorize(Roles = "Supplier,Owner")]
        public async Task<ActionResult<Medicine>> GetMedicineById(int medicineId)
        {
            try
            {
                var medicine = await _medicineService.GetMedicineById(medicineId);
                if (medicine == null)
                {
                    return NotFound("Cannot find any medicine");
                }
                return Ok(medicine);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Supplier")]
        public async Task<ActionResult> AddMedicine([FromBody] Medicine medicine)
        {
            try
            {
                var result = await _medicineService.AddMedicine(medicine);

                if (result)
                {
                    return Ok("Medicine added successfully");
                }
                return StatusCode(500, "Failed to add medicine");
            }
            // catch (MedicineException ex)
            // {
            //     return BadRequest(ex.Message);
            // }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{medicineId}")]
        [Authorize(Roles = "Supplier")]
        public async Task<ActionResult> UpdateMedicine(int medicineId, [FromBody] Medicine medicine)
        {
            try
            {
                var result = await _medicineService.UpdateMedicine(medicineId, medicine);
                if (result)
                {
                    return Ok("Medicine updated successfully");
                }
                return NotFound("Medicine Failed to Update");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "Supplier")]
        public async Task<ActionResult<IEnumerable<Medicine>>> GetMedicinesByUserId(string userId)
        {
            try
            {
                var medicines = await _medicineService.GetMedicinesByUserId(userId);
                if (medicines == null || !medicines.Any())
                {
                    return NotFound("Cannot find any medicines for this user");
                }
                return Ok(medicines);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{medicineId}")]
        public async Task<ActionResult> DeleteMedicine(int medicineId)
        {
            try
            {
                var result = await _medicineService.DeleteMedicine(medicineId);
                if (result)
                {
                    return Ok("Medicine deleted successfully");
                }
                return NotFound("Cannot find any medicine");
            }
            // catch (MedicineException ex)
            // {
            //     return BadRequest(ex.Message);
            // }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
