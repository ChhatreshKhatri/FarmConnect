using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/request")]
    [ApiController]
    [Authorize]
    public class RequestController : ControllerBase
    {
        private readonly RequestService _requestService;
        public RequestController(RequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetAllRequests()
        {
            try
            {
                var requests = await _requestService.GetAllRequests();
                return Ok(requests);
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
       

        [HttpGet("{requestId}")]
        [Authorize(Roles = "Supplier,Owner")]
        public async Task<ActionResult<Request>> GetRequestById(int requestId)
        {
            try
            {
                var request = await _requestService.GetRequestById(requestId);
                if (request == null)
                {
                    return NotFound("No request with the provided ID.");
                }
                return Ok(request);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "Supplier,Owner")]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequestByuserId(int userId)
        {
            try
            {
                var requests = await _requestService.GetRequestByuserId(userId);
                if (requests == null)
                {
                    return NotFound("No requests found for the specified user.");
                }
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("user/{userId}/medicines-or-feeds")]
        [Authorize(Roles = "Supplier,Owner")]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequestsByuserIdMedicineOrFeed(int userId)
        {
            try
            {
                var requests = await _requestService.GetRequestsByuserIdMedicineOrFeed(userId);
                if (requests == null)
                {
                    return NotFound("No requests found for the specified user in medicine or feed category.");
                }
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult> AddRequest([FromBody] Request request)
        {
            try
            {
                await _requestService.AddRequest(request);
                return Ok("Request added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to add request:{ex.Message}");
            }
        }
        [HttpPut("{requestId}")]
        [Authorize(Roles = "Supplier")]
        public async Task<ActionResult> UpdateRequest(int requestId, [FromBody] Request request)
        {
            try
            {
                await _requestService.UpdateRequest(requestId, request);
                return Ok("Request updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete("{requestId}")]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult> DeleteRequest(int requestId)
        {
            try
            {
                await _requestService.DeleteRequest(requestId);
                return Ok("Request deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}