using Livraria.Dto.Usuario;
using Livraria.Models;

namespace Livraria.Services.Auth
{
	public interface IAuthInterface
	{
		Task<ResponseModel<UsuarioRegisterDto>> Registrar(UsuarioRegisterDto usuarioRegister);
		Task<ResponseModel<string>> Login(UsuarioLoginDto usuarioLogin);
		Task<ResponseModel<string>> ConfirmarEmail(string token);
	}
}
