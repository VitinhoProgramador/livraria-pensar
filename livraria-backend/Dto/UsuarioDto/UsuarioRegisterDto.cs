using System.ComponentModel.DataAnnotations;

namespace Livraria.Dto.Usuario
{
	public class UsuarioRegisterDto
	{
		[Required(ErrorMessage = "O campo Nome é obrigatorio")]
		public string Usuario { get; set; }
		[Required(ErrorMessage = "O e-mail é obrigatório!")]
		[EmailAddress(ErrorMessage = "O formato do e-mail é inválido!")]
		public string Email { get; set; }
		[Required(ErrorMessage = "O campo senha é obrigatorio")]
		public string Senha { get; set; }
		[Compare("Senha", ErrorMessage = "Senhas não conincidem")]

		public string ConfirmaSenha { get; set; }
		
	}
}
