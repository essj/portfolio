using Microsoft.EntityFrameworkCore.Migrations;

namespace Portfolio.Data.Migrations
{
    public partial class AddIpAndSourceToPings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Pings");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Pings");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Pings",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "Source",
                table: "Pings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Source",
                table: "Pings");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Pings",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Pings",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Pings",
                nullable: false,
                defaultValue: 0);
        }
    }
}
