using System.ComponentModel.DataAnnotations;

namespace Livraria.Dto.Usuario
{
	public class UsuarioUpdateDto
	{
		public required string Usuarios { get; set; }
		[Required(ErrorMessage = "O e-mail é obrigatório!")]
		[EmailAddress(ErrorMessage = "O formato do e-mail é inválido!")]
		public required string Email { get; set; }
	}
}
