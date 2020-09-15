using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using System;

namespace LadsOnTour.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    DiscordID = table.Column<string>(nullable: false),
                    Rank = table.Column<string>(nullable: true),
                    RankNumber = table.Column<int>(nullable: false),
                    Nickname = table.Column<string>(nullable: true),
                    Discord = table.Column<string>(nullable: true),
                    DiscordDiscriminator = table.Column<string>(nullable: true),
                    InDiscord = table.Column<string>(nullable: true),
                    Main = table.Column<int>(nullable: false),
                    MainName = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    Class = table.Column<string>(nullable: true),
                    Armory = table.Column<string>(nullable: true),
                    Days = table.Column<string>(nullable: true),
                    TwitchId = table.Column<string>(nullable: true),
                    TwitchName = table.Column<string>(nullable: true),
                    BattleNetToken = table.Column<string>(nullable: true),
                    BattleNetTokenExpiration = table.Column<DateTime>(nullable: false),
                    About = table.Column<string>(nullable: true),
                    Experience = table.Column<string>(nullable: true),
                    AppStatus = table.Column<string>(nullable: true),
                    AppLogs = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.DiscordID);
                });

            migrationBuilder.CreateTable(
                name: "wow_characters",
                columns: table => new
                {
                    character_id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    discord_id = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true),
                    _class = table.Column<string>(nullable: true),
                    role = table.Column<string>(nullable: true),
                    realm = table.Column<string>(nullable: true),
                    rank = table.Column<int>(nullable: false),
                    rank_name = table.Column<string>(nullable: true),
                    armory = table.Column<string>(nullable: true),
                    guild = table.Column<string>(nullable: true),
                    level = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_wow_characters", x => x.character_id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "wow_characters");
        }
    }
}