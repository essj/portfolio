﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Portfolio.Data;

namespace Portfolio.Data.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Portfolio.Data.Models.Ping", b =>
                {
                    b.Property<Guid>("PingId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("IpAddress");

                    b.Property<int>("Source");

                    b.Property<DateTimeOffset>("Timestamp");

                    b.Property<string>("UserName");

                    b.HasKey("PingId");

                    b.ToTable("Pings");
                });
#pragma warning restore 612, 618
        }
    }
}
