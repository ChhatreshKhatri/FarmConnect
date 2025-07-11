using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class FeedbackService
    {
       private readonly ApplicationDbContext _context;
       public FeedbackService(ApplicationDbContext context)

        {
            _context = context;
        }
        public async Task<IEnumerable<Feedback>> GetAllFeedbacks(){
            IEnumerable<Feedback> feedbacks = _context.Feedbacks.Include(f=>f.User);
            return feedbacks;
        }
        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId){
            IEnumerable<Feedback> feedbacks =_context.Feedbacks.Where(f=>f.UserId==userId);
            return feedbacks;
        }
        public async Task<bool> AddFeedback(Feedback feedback){
                _context.Feedbacks.Add(feedback);
                await _context.SaveChangesAsync();
                return true;
        }
        public async Task<bool> DeleteFeedback(int feedbackId){
            Feedback feedback =_context.Feedbacks.FirstOrDefault(f=>f.FeedbackId==feedbackId);
            if (feedback!=null){
                _context.Feedbacks.Remove(feedback);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}