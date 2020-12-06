using Microsoft.EntityFrameworkCore.Migrations;

namespace LadsOnTour.Migrations
{
    public partial class ItemUpdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InventoryTypeId",
                table: "NathariaItems");

            migrationBuilder.AddColumn<string>(
                name: "ItemClass",
                table: "NathariaItems",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemSubClass",
                table: "NathariaItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemClass",
                table: "NathariaItems");

            migrationBuilder.DropColumn(
                name: "ItemSubClass",
                table: "NathariaItems");

            migrationBuilder.AddColumn<string>(
                name: "InventoryTypeId",
                table: "NathariaItems",
                type: "text",
                nullable: true);
        }
    }
}
