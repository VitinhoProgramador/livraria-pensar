using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Livraria.Migrations
{
    /// <inheritdoc />
    public partial class addUsuarioModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsuarioModelId",
                table: "Livros",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    usuario = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    senha_hash = table.Column<byte[]>(type: "bytea", nullable: false),
                    senha_salt = table.Column<byte[]>(type: "bytea", nullable: false),
                    refresh_token = table.Column<string>(type: "text", nullable: true),
                    token_data_expiracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsAtivo = table.Column<bool>(type: "boolean", nullable: false),
                    AtivacaoToken = table.Column<string>(type: "text", nullable: true),
                    data_registro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    token_data_criacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuarios", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Livros_UsuarioModelId",
                table: "Livros",
                column: "UsuarioModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_usuarios_UsuarioModelId",
                table: "Livros",
                column: "UsuarioModelId",
                principalTable: "usuarios",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Livros_usuarios_UsuarioModelId",
                table: "Livros");

            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropIndex(
                name: "IX_Livros_UsuarioModelId",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "UsuarioModelId",
                table: "Livros");
        }
    }
}
