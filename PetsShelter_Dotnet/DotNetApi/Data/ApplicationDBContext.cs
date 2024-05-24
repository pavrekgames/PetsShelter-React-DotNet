using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Models;
using DotNetApi.Seeders;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DotNetApi.Data
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {

        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            //this.petSeeder = petSeeder;
        }

        public DbSet<Pet> Pets { get; set; }
        public DbSet<UserPet> UserPets { get; set; }
        public DbSet<SickPet> SickPets {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                 new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);

            builder.Entity<User>()
            .HasMany(u => u.Pets)
            .WithOne(p => p.User)
            .HasForeignKey(p => p.UserId);

            builder.Entity<UserPet>()
            .HasKey(x => new{x.UserId, x.PetId});

            builder.Entity<UserPet>()
            .HasOne(up => up.Pet)
            .WithMany(p => p.UserPets)
            .HasForeignKey(up => up.PetId)
            .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<UserPet>()
            .HasOne(up => up.User)
            .WithMany(u => u.UserPets)
            .HasForeignKey(up => up.UserId)
            .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}