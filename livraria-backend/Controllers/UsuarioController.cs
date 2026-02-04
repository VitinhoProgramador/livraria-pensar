using Livraria.Dto.Usuario;
using Livraria.Models;
using Livraria.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Livraria.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UsuarioController : ControllerBase
	{
		private readonly IUsuarioInterface _usuarioInterface;
		public UsuarioController(IUsuarioInterface usuarioInterface)
		{
			_usuarioInterface = usuarioInterface;
		}

		[HttpGet]
		public async Task<ActionResult<ResponseModel<List<UsuarioReadDto>>>> Get()
		{
			return Ok(await _usuarioInterface.ListarUsuarios());
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ResponseModel<UsuarioReadDto>>> GetById(int id)
		{
			var response = await _usuarioInterface.BuscarUsuarioPorId(id);
			if (!response.Status) return NotFound(response);
			return Ok(response);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<ResponseModel<UsuarioReadDto>>> Update(int id, UsuarioUpdateDto usuarioUpdate)
		{
			var response = await _usuarioInterface.EditarUsuario(id, usuarioUpdate);
			if (!response.Status) return BadRequest(response);
			return Ok(response);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<ResponseModel<bool>>> Delete(int id)
		{
			var response = await _usuarioInterface.ExcluirUsuario(id);
			if (!response.Status) return NotFound(response);
			return Ok(response);
		}
	}
}
