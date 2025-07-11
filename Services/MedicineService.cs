using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{

    public class MedicineService
    {
        private readonly ApplicationDbContext _context;
        public MedicineService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Medicine>> GetAllMedicines()
        {
            return await _context.Medicines.ToListAsync();
        }
        public async Task<Medicine> GetMedicineById(int medicineId)
        {
            return await _context.Medicines.FindAsync(medicineId);
        }
        public async Task<IEnumerable<Medicine>> GetMedicinesByUserId(int userId)
        {
            return await _context.Medicines.Where(m => m.UserId == userId).ToListAsync();
        }
        public async Task<bool> AddMedicine(Medicine medicine)
        {
            if (await _context.Medicines.AnyAsync(m => m.MedicineName == medicine.MedicineName && m.Brand == medicine.Brand))
            {
                throw new MedicineException("Medicine with the same name and brand already exists");
            }

            await _context.Medicines.AddAsync(medicine);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateMedicine(int medicineId, Medicine medicine)
        {
            var exstMedicine = await _context.Medicines.FindAsync(medicineId);
            if (exstMedicine != null)
            {
                // if (medicine.MedicineName == exstMedicine.MedicineName && medicine.Brand == exstMedicine.Brand && medicine.UserId == exstMedicine.UserId)
                // {
                //     return false;
                // }
                exstMedicine.MedicineName = medicine.MedicineName;
                exstMedicine.Brand = medicine.Brand;
                exstMedicine.Category = medicine.Category;
                exstMedicine.Description = medicine.Description;
                exstMedicine.Quantity = medicine.Quantity;
                exstMedicine.Unit = medicine.Unit;
                exstMedicine.PricePerUnit = medicine.PricePerUnit;
                exstMedicine.Image = medicine.Image;
                exstMedicine.UserId = medicine.UserId;

                _context.Medicines.Update(exstMedicine);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
        public async Task<bool> DeleteMedicine(int medicineId)
        {
            var medicine = await _context.Medicines.FindAsync(medicineId);
            if (medicine != null)
            {
                _context.Medicines.Remove(medicine);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

    }
}



