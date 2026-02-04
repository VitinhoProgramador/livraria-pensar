using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Livraria.Models
{
	[Table("usuarios")] // Mapeia para o nome exato da tabela no seu SQL
	public class UsuarioModel
	{
		[Key]
		public int Id { get; set; }

		[Column("usuario")]
		public string Usuario { get; set; } = string.Empty;// para o valor começar vazio e não nulo

		[Column("email")]
		public string Email { get; set; } = string.Empty;

		[Column("senha_hash")]
		public byte[] SenhaHash { get; set; } = Array.Empty<byte>();//para o array do tipo byte iniciar vazio

		[Column("senha_salt")]
		public byte[] SenhaSalt { get; set; } = Array.Empty<byte>();

		[Column("refresh_token")]
		public string? RefreshToken { get; set; }// "string?" quer dizer que esse campo pode ser null

		[Column("token_data_expiracao")]
		public DateTime? TokenDataExpiracao { get; set; }// "string?" quer dizer que esse campo pode ser null

		public bool IsAtivo { get; set; } = false;
		public string? AtivacaoToken { get; set; }

		[Column("data_registro")]
		public DateTime DataRegistro { get; set; } = DateTime.UtcNow;

		[Column("token_data_criacao")]
		public DateTime TokenDataCriacao { get; set; } = DateTime.UtcNow;

		public virtual ICollection<LivroModel> Livros { get; set; } = new List<LivroModel>();
	}
}
