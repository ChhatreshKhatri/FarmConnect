using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class LivestockService
    {
        private readonly ApplicationDbContext _context;

        public LivestockService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Livestock>> GetAllLivestocks()
        {
            return _context.Livestocks.ToList();
        }

        // Retrieves a livestock record from the database with the specified livestockId
        public async Task<Livestock> GetLivestockById(int livestockId)
        {
            return await _context.Livestocks.FindAsync(livestockId);
        }

        // Retrieves and returns all livestock records from the database associated with the specified userId
        public async Task<IEnumerable<Livestock>> GetLivestocksByUserId(string userId)
        {
            return await _context.Livestocks.Where(l => l.UserId == userId).ToListAsync();
        }

        // Adds a new livestock to the database if it doesn't already exist
        public async Task<bool> AddLivestock(Livestock livestock)
        {
            bool exists = await _context.Livestocks.AnyAsync(l => l.Name == livestock.Name && l.Breed == livestock.Breed && l.Species == livestock.Species);
            if (exists)
            {
                // throw new LivestockException("Livestock with the same name, breed, and species already exists");
            }

            _context.Livestocks.Add(livestock);
            await _context.SaveChangesAsync();
            return true;
        }

        // Updates an existing livestock record in the database
        public async Task<bool> UpdateLivestock(int livestockId, Livestock livestock)
        {
            var existingLivestock = await _context.Livestocks.FindAsync(livestockId);
            if (existingLivestock == null)
            {
                return false;
            }

            // bool exists = await _context.Livestocks.AnyAsync(l => l.Name == livestock.Name && l.Breed == livestock.Breed && l.Species == livestock.Species && l.LivestockId != livestockId);
            if (existingLivestock == livestock)
            {
                throw new LivestockException("Livestock with the same name, breed, and species already exists");
            }
            existingLivestock.Name = livestock.Name;
            existingLivestock.Breed = livestock.Breed;
            existingLivestock.Species = livestock.Species;
            existingLivestock.Age = livestock.Age; // Assuming Age or other fields need to be updated
            existingLivestock.HealthCondition = livestock.HealthCondition;
            existingLivestock.Location = livestock.Location;
            existingLivestock.VaccinationStatus = livestock.VaccinationStatus;


            _context.Livestocks.Update(existingLivestock);
            await _context.SaveChangesAsync();
            return true;
        }


        // Deletes an existing livestock record from the database
        public async Task<bool> DeleteLivestock(int livestockId)
        {
            var livestock = await _context.Livestocks.FindAsync(livestockId);
            if (livestock == null)
            {
                return false;
            }

            bool isReferenced = await _context.Requests.AnyAsync(r => r.LivestockId == livestockId); // Assuming Requests is a DbSet in your context
            if (isReferenced)
            {
                // throw new LivestockException("Livestock cannot be deleted, it is referenced in requests");
            }

            _context.Livestocks.Remove(livestock);
            await _context.SaveChangesAsync();
            return true;
        }
    }


}

