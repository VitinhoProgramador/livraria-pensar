using Livraria.Data;
using Livraria.Dto.Usuario;
using Livraria.Models;
using Microsoft.EntityFrameworkCore;

namespace Livraria.Services.User
{
	public class UsuarioService : IUsuarioInterface
	{
		private readonly AppDbContext _context;
		public UsuarioService(AppDbContext context)
		{
			_context = context;
		}

		public async Task<ResponseModel<List<UsuarioReadDto>>> ListarUsuarios()
		{
			var response = new ResponseModel<List<UsuarioReadDto>>();
			var usuarios = await _context.Usuario.ToListAsync();

			// Mapeamento manual: de Model para DTO
			response.Dados = usuarios.Select(u => MapToReadDto(u)).ToList();
			response.Mensagem = "Usuários listados com sucesso!";
			return response;
		}

		public async Task<ResponseModel<UsuarioReadDto>> BuscarUsuarioPorId(int idUsuario)
		{
			var response = new ResponseModel<UsuarioReadDto>();
			var usuario = await _context.Usuario.FirstOrDefaultAsync(usuarioBanco => usuarioBanco.Id == idUsuario);

			if (usuario == null)
			{
				response.Mensagem = "Usuário não encontrado!";
				response.Status = false;
				return response;
			}

			response.Dados = MapToReadDto(usuario);
			return response;
		}

		public async Task<ResponseModel<UsuarioReadDto>> EditarUsuario(int idUsuario, UsuarioUpdateDto usuarioUpdate)
		{
			var response = new ResponseModel<UsuarioReadDto>();

			var usuarioExistente = await _context.Usuario.FirstOrDefaultAsync(u => u.Email == usuarioUpdate.Email);
			if (usuarioExistente != null && usuarioExistente.Id != idUsuario)
			{
				response.Mensagem = "Este e-mail já está em uso!";
				response.Status = false;
				return response;
			}

			var usuario = await _context.Usuario.FirstOrDefaultAsync(usuarioBanco => usuarioBanco.Id == idUsuario);
			if (usuario == null)
			{
				response.Mensagem = "Usuário não encontrado!";
				response.Status = false;
				return response;
			}

			usuario.Usuario = usuarioUpdate.Usuarios;
			usuario.Email = usuarioUpdate.Email;

			_context.Update(usuario);
			await _context.SaveChangesAsync();

			response.Dados = MapToReadDto(usuario);
			response.Mensagem = "Usuário atualizado com sucesso!";
			return response;
		}

		// --- Método Auxiliar de Mapeamento Manual ---
		private UsuarioReadDto MapToReadDto(UsuarioModel u)
		{
			return new UsuarioReadDto(
				u.Id,
				u.Usuario,
				u.Email,
				u.DataRegistro
			);
		}

		public async Task<ResponseModel<bool>> ExcluirUsuario(int idUsuario)
		{
			var response = new ResponseModel<bool>();
			var usuario = await _context.Usuario.FirstOrDefaultAsync(usuarioBanco => usuarioBanco.Id == idUsuario);

			if (usuario == null)
			{
				response.Mensagem = "Usuário não encontrado!";
				response.Status = false;
				return response;
			}

			_context.Remove(usuario);
			await _context.SaveChangesAsync();

			response.Dados = true;
			response.Mensagem = "Usuário removido.";
			return response;
		}
	}
}
