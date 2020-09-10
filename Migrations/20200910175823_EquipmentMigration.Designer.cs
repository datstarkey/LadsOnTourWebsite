﻿// <auto-generated />
using System;
using LadsOnTour.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LadsOnTour.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20200910175823_EquipmentMigration")]
    partial class EquipmentMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("LadsOnTour.Models.User", b =>
                {
                    b.Property<string>("DiscordID")
                        .HasColumnType("text");

                    b.Property<string>("About")
                        .HasColumnType("text");

                    b.Property<string>("AppLogs")
                        .HasColumnType("text");

                    b.Property<string>("AppStatus")
                        .HasColumnType("text");

                    b.Property<string>("Armory")
                        .HasColumnType("text");

                    b.Property<string>("BattleNet")
                        .HasColumnType("text");

                    b.Property<string>("BattleNetToken")
                        .HasColumnType("text");

                    b.Property<DateTime>("BattleNetTokenExpiration")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Class")
                        .HasColumnType("text");

                    b.Property<string>("Days")
                        .HasColumnType("text");

                    b.Property<string>("Discord")
                        .HasColumnType("text");

                    b.Property<string>("DiscordDiscriminator")
                        .HasColumnType("text");

                    b.Property<string>("Experience")
                        .HasColumnType("text");

                    b.Property<string>("InDiscord")
                        .HasColumnType("text");

                    b.Property<int>("Main")
                        .HasColumnType("integer");

                    b.Property<string>("MainName")
                        .HasColumnType("text");

                    b.Property<string>("Nickname")
                        .HasColumnType("text");

                    b.Property<string>("Rank")
                        .HasColumnType("text");

                    b.Property<int>("RankNumber")
                        .HasColumnType("integer");

                    b.Property<string>("Role")
                        .HasColumnType("text");

                    b.Property<string>("TwitchId")
                        .HasColumnType("text");

                    b.Property<string>("TwitchName")
                        .HasColumnType("text");

                    b.HasKey("DiscordID");

                    b.ToTable("users");
                });

            modelBuilder.Entity("LadsOnTour.Models.WoWCharacter", b =>
                {
                    b.Property<int>("character_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("_class")
                        .HasColumnType("text");

                    b.Property<string>("armory")
                        .HasColumnType("text");

                    b.Property<int>("averageIlevel")
                        .HasColumnType("integer");

                    b.Property<string>("discord_id")
                        .HasColumnType("text");

                    b.Property<string>("equipment")
                        .HasColumnType("text");

                    b.Property<int>("equippedIlevel")
                        .HasColumnType("integer");

                    b.Property<string>("guild")
                        .HasColumnType("text");

                    b.Property<int>("level")
                        .HasColumnType("integer");

                    b.Property<string>("name")
                        .HasColumnType("text");

                    b.Property<int>("rank")
                        .HasColumnType("integer");

                    b.Property<string>("rank_name")
                        .HasColumnType("text");

                    b.Property<string>("realm")
                        .HasColumnType("text");

                    b.Property<string>("role")
                        .HasColumnType("text");

                    b.HasKey("character_id");

                    b.ToTable("wow_characters");
                });
#pragma warning restore 612, 618
        }
    }
}
