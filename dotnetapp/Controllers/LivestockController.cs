using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/livestock")]
    [Authorize(Roles = "Owner")]
    public class LivestockController : ControllerBase
    {
        private readonly LivestockService _livestockService;

        public LivestockController(LivestockService livestockService)
        {
            _livestockService = livestockService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Livestock>>> GetAllLivestocks()
        {
            try
            {
                return Ok(await _livestockService.GetAllLivestocks());
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // Retrieves a livestock from the database with the specified livestockId
        [HttpGet("{livestockId}")]
        public async Task<ActionResult<Livestock>> GetLivestockById(int livestockId)
        {
            try
            {
                var livestock = await _livestockService.GetLivestockById(livestockId);
                if (livestock == null)
                {
                    return NotFound(new { message = "Cannot find any livestock with the specified ID" });
                }
                return Ok(livestock);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // Retrieves and returns all livestock associated with the specified userId from the database
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Livestock>>> GetLivestocksByUserId(int userId)
        {
            try
            {
                var livestocks = await _livestockService.GetLivestocksByUserId(userId);
                if (livestocks == null || !livestocks.Any())
                {
                    return NotFound(new { message = "No livestock found for this user" });
                }
                return Ok(livestocks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // Adds a new livestock to the database.
        [HttpPost]
        public async Task<ActionResult> AddLivestock([FromBody] Livestock livestock)
        {
            try
            {
                var result = await _livestockService.AddLivestock(livestock);
                if (result)
                {
                    return Ok(new {message="Livestock added successfully"});
                }
                return StatusCode(500, new {message="Failed to add livestock"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {message=ex.Message});
            }
        }

        // Updates an existing livestock in the database.
        [HttpPut("{livestockId}")]
        public async Task<ActionResult> UpdateLivestock(int livestockId, [FromBody] Livestock livestock)
        {
            try
            {
                var result = await _livestockService.UpdateLivestock(livestockId, livestock);
                if (result)
                {
                    return Ok(new {message="Livestock updated successfully"});
                }
                return NotFound(new {message="Cannot find any livestock with the specified ID"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {message=ex.Message});
            }
        }

        // Deletes a livestock from the database.
        [HttpDelete("{livestockId}")]
        public async Task<ActionResult> DeleteLivestock(int livestockId)
        {
            try
            {
                var result = await _livestockService.DeleteLivestock(livestockId);
                if (result)
                {
                    return Ok(new {message="Livestock deleted successfully"});
                }
                return NotFound(new {message="Cannot find any livestock with the specified ID"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}