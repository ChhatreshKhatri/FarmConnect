using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using dotnetapp.Models;
using System;

namespace dotnetapp.Data{
    public class ApplicationDbContext:IdentityDbContext<ApplicationUser>{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options){}
        public DbSet<Feedback> Feedbacks{get;set;}
        public DbSet<User> Users{get;set;}
        public DbSet<Feed> Feeds{get;set;}
        public DbSet<Medicine> Medicines{get;set;}
        public DbSet<Request> Requests{get;set;}
        public DbSet<Livestock> Livestocks{get;set;}

        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);

            foreach(var foreignKey in builder.Model.GetEntityTypes().SelectMany(e=>e.GetForeignKeys())){
                foreignKey.DeleteBehavior=DeleteBehavior.NoAction;
            }
            
            // builder.Entity<Request>()
            // .HasOne(r=>r.User)
            // .WithMany()
            // .HasForeignKey(r=>r.UserId)
            // .OnDelete(DeleteBehavior.NoAction);

            // builder.Entity<Medicine>()
            // .HasOne()
            // .WithMany()
            // .HasForeignKey(r=>r.UserId)
            // .OnDelete(DeleteBehavior.NoAction);
        }
    }
}