using dotnetapp.Models;
namespace dotnetapp.Services{
    public interface IAuthService{
        public Task<(int, string)> Registration (User model, string role);
        public Task<(int, string)> Login (LoginModel model); 
    }
}