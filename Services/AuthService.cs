using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.Tasks.Sources;


namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private UserManager<ApplicationUser> userManager;
        private RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }
        public async Task<(int, string)> Registration(User model, string role)
        {
            ApplicationUser user = new ApplicationUser() { Name = model.Username, UserName = model.Username, Email = model.Email, PhoneNumber = model.MobileNumber };
            var exstUser = await userManager.FindByEmailAsync(model.Email);
            if (exstUser != null) return (0, "User already exists.");
            if (UserRoles.Owner == role || UserRoles.Supplier == role)
            {
                IdentityResult result = await userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                    {
                        await roleManager.CreateAsync(new IdentityRole(role));
                    }
                    await userManager.AddToRoleAsync(user, role);
                    return (1, "User created successfully!");
                }
                string message = string.Join(", ", result.Errors.Select(x => x.Description));

                return (0, message);
            }
            return (0, "User creation failed! Please check user details and try again");
        }
        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                var result = await userManager.CheckPasswordAsync(user, model.Password);
                if (result)
                {
                    string token = await GenerateToken(user);
                    return (1, token);
                }
                else
                {
                    return (0, "Invalid password");
                }
            }
            return (0, "Invalid Email");
        }
        public async Task<string> GenerateToken(ApplicationUser user)
        {
            var now = DateTime.UtcNow; // Use UTC time
            var userRoles = await userManager.GetRolesAsync(user);
            var role = userRoles.FirstOrDefault() ?? "User";

            var claims = new[]
            {
        new Claim("role", role),
        new Claim("name", user.UserName ?? ""),
        new Claim("userId", user.Id),
        new Claim(JwtRegisteredClaimNames.Iat,
            new DateTimeOffset(now).ToUnixTimeSeconds().ToString(),
            ClaimValueTypes.Integer64) // Add explicit issued at time
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? ""));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claims,
                notBefore: now, // Add this for better security
                expires: now.AddMinutes(30), // Changed to UTC and explicit 30 minutes
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}