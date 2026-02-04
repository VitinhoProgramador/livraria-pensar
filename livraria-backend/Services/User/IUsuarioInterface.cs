using Livraria.Dto.Usuario;
using Livraria.Models;

namespace Livraria.Services.User
{
	public interface IUsuarioInterface
	{
		Task<ResponseModel<List<UsuarioReadDto>>> ListarUsuarios();
		Task<ResponseModel<UsuarioReadDto>> BuscarUsuarioPorId(int id);
		Task<ResponseModel<UsuarioReadDto>> EditarUsuario(int Id, UsuarioUpdateDto usuarioUpdate);
		Task<ResponseModel<bool>> ExcluirUsuario(int Id);

	}
}
