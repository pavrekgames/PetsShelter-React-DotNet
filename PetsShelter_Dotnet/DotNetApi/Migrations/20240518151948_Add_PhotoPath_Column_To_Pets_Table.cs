using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DotNetApi.Migrations
{
    /// <inheritdoc />
    public partial class AddPhotoPathColumnToPetsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "63fe4650-6b98-491b-a516-645801707e4d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b02b78eb-0a70-4126-9700-50251850d328");

            migrationBuilder.AddColumn<string>(
                name: "Photo_Path",
                table: "Pets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9f55790b-6fd5-4455-a452-879397b3021a", null, "User", "USER" },
                    { "a7394780-74e8-443d-bb5e-338cfb880e56", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9f55790b-6fd5-4455-a452-879397b3021a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a7394780-74e8-443d-bb5e-338cfb880e56");

            migrationBuilder.DropColumn(
                name: "Photo_Path",
                table: "Pets");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "63fe4650-6b98-491b-a516-645801707e4d", null, "User", "USER" },
                    { "b02b78eb-0a70-4126-9700-50251850d328", null, "Admin", "ADMIN" }
                });
        }
    }
}
