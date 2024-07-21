using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Exceptions;
using Microsoft.AspNetCore.Authorization;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/feedback")]
    [Authorize]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _service;
        public FeedbackController(FeedbackService service)
        {
            _service = service;
        }
        [HttpGet]
        [Authorize(Roles="Owner,Supplier")]
        // [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks(){
            try{
                IEnumerable<Feedback> feedbacks=await _service.GetAllFeedbacks();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("user/{userId}")]
        [Authorize(Roles = "Supplier,Owner")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            try
            {
                IEnumerable<Feedback> feedbacks = await _service.GetFeedbacksByUserId(userId);
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult<Feedback>> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    bool var = await _service.AddFeedback(feedback);
                    if (var) return CreatedAtAction(nameof(AddFeedback), feedback,"Feedback added successfully");
                    return BadRequest();
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete("{feedbackId}")]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                bool var = await _service.DeleteFeedback(feedbackId);
                if (var) return Ok("Feedback deleted successfully");
                return NotFound("Feedback deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}