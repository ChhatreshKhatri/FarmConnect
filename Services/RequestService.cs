using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{

    public class RequestService
    {
        private readonly ApplicationDbContext _context;

        public RequestService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Request>> GetAllRequests()
        {
            return await _context.Requests.Include(r => r.Feed).Include(r => r.Medicine).Include(r => r.Livestock).ToListAsync();
        }

        public async Task<Request> GetRequestById(int requestId)
        {
            return await _context.Requests.FindAsync(requestId);
        }

        public async Task<bool> AddRequest(Request request)
        {
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateRequest(int requestId, Request request)
        {
            var existingRequest = await _context.Requests.FindAsync(requestId);
            if (existingRequest == null)
            {
                return false;
            }

            // existingRequest.RequestType=request.RequestType;
            // existingRequest.Quantity=request.Quantity;
            existingRequest.Status = request.Status;
            // existingRequest.RequestDate=request.RequestDate;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Request>> GetRequestByuserId(string userId)
        {
            return await _context.Requests.Where(r => r.UserId == userId).Include(r => r.Feed).Include(r => r.Medicine).ToListAsync();
        }

        //Check this function
        public async Task<IEnumerable<Request>> GetRequestsByuserIdMedicineOrFeed(string userId)
        {
            return await _context.Requests.Where(r => r.UserId == userId && (r.MedicineId != 0 || r.FeedId != 0)).ToListAsync();
        }

        public async Task<bool> DeleteRequest(int requestId)
        {
            var request = await _context.Requests.FindAsync(requestId);
            if (request == null)
            {
                return false;
            }
            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}

