using System.Collections.Generic;
using System.Linq;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = await _authService.Login(model);
                    if (response.Item1 == 1)
                    {

                        return Ok(new { token = response.Item2 });

                    }
                    return StatusCode(500, new { message = response.Item2 });
                }
                return BadRequest(model);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(User model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = await _authService.Registration(model, model.UserRole);
                    if (response.Item1 == 1)
                    {
                        return Ok(new { message = response.Item2 });
                    }
                    return StatusCode(500, new { message = response.Item2 });
                }
                return BadRequest(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}