using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LadsOnTour.Migrations
{
    public partial class AddBisList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BisListId",
                table: "users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BisList",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HelmId = table.Column<int>(nullable: false),
                    NeckId = table.Column<int>(nullable: false),
                    ShoulderId = table.Column<int>(nullable: false),
                    CloakId = table.Column<int>(nullable: false),
                    ChestId = table.Column<int>(nullable: false),
                    WristId = table.Column<int>(nullable: false),
                    GloveId = table.Column<int>(nullable: false),
                    WaistId = table.Column<int>(nullable: false),
                    LegId = table.Column<int>(nullable: false),
                    Ring1Id = table.Column<int>(nullable: false),
                    Ring2Id = table.Column<int>(nullable: false),
                    Trinket1Id = table.Column<int>(nullable: false),
                    Trinket2Id = table.Column<int>(nullable: false),
                    MainHandId = table.Column<int>(nullable: false),
                    OffHandId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BisList", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NathariaItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InventoryType = table.Column<string>(nullable: true),
                    InventoryTypeId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NathariaItems", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_users_BisListId",
                table: "users",
                column: "BisListId");

            migrationBuilder.AddForeignKey(
                name: "FK_users_BisList_BisListId",
                table: "users",
                column: "BisListId",
                principalTable: "BisList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_users_BisList_BisListId",
                table: "users");

            migrationBuilder.DropTable(
                name: "BisList");

            migrationBuilder.DropTable(
                name: "NathariaItems");

            migrationBuilder.DropIndex(
                name: "IX_users_BisListId",
                table: "users");

            migrationBuilder.DropColumn(
                name: "BisListId",
                table: "users");
        }
    }
}
