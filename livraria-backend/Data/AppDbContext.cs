using Livraria.Models;
using Microsoft.EntityFrameworkCore;

namespace Livraria.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext>options): base(options)
        {

        }

        public DbSet<AutorModel> Autor { get; set; }
        public DbSet<LivroModel> Livros { get; set; }
		public DbSet<UsuarioModel> Usuario { get; set; }

	}
}
