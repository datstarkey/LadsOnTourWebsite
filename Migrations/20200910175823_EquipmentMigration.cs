using Microsoft.EntityFrameworkCore.Migrations;

namespace LadsOnTour.Migrations
{
    public partial class EquipmentMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "averageIlevel",
                table: "wow_characters",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "equipment",
                table: "wow_characters",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "equippedIlevel",
                table: "wow_characters",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "BattleNet",
                table: "users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "averageIlevel",
                table: "wow_characters");

            migrationBuilder.DropColumn(
                name: "equipment",
                table: "wow_characters");

            migrationBuilder.DropColumn(
                name: "equippedIlevel",
                table: "wow_characters");

            migrationBuilder.DropColumn(
                name: "BattleNet",
                table: "users");
        }
    }
}