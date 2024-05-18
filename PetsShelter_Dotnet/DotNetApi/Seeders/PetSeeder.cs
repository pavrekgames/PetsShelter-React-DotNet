using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Dtos.Pet;
using DotNetApi.Interfaces;
using DotNetApi.Models;
using Microsoft.Identity.Client;

namespace DotNetApi.Seeders
{
    public static class PetSeeder
    {

        public static WebApplication Seed(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                using var context = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
                try
                {
                    context.Database.EnsureCreated();

                    if (context.Database.CanConnect())
                    {
                        if (!context.Pets.Any())
                        {
                            var pets = GetPets();
                            context.Pets.AddRange(pets);
                            context.SaveChanges();
                        }
                    }
                }
                catch
                {

                }

                IEnumerable<Pet> GetPets()
                {

                    var pets = new List<Pet>(){

                new Pet()
                {
                    Name = "Mruczek",
                    Species = "Kot",
                    Race = "Domowy",
                    Size = "Mały",
                    Description= "",
                    User_Id = "sss",
                },
                 new Pet()
                {
                    Name = "Dido",
                    Species = "Pies",
                    Race = "Kundel",
                    Size = "średni",
                    Description= "Piesek",
                    User_Id = "ddd",
                },
                 new Pet()
                {
                    Name = "Stefan",
                    Species = "Koń",
                    Race = "Arab",
                    Size = "Duży",
                    Description= "",
                    User_Id = "sss",
                },
                  new Pet()
                {
                    Name = "Kajtek",
                    Species = "Pies",
                    Race = "Jamnik",
                    Size = "Mały",
                    Description= "",
                    User_Id = "ccc",
                },
                  new Pet()
                {
                    Name = "Perła",
                    Species = "Kot",
                    Race = "Brytyjski",
                    Size = "Mały",
                    Description= "",
                    User_Id = "ddd",
                },
            };

                    return pets;
                }

                return app;

            }
        }

    }
}