using Livraria.Dto.Usuario;
using Livraria.Services.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Livraria.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly IAuthInterface _authInterface;
		public AuthController(IAuthInterface authInterface)
		{
			_authInterface = authInterface;
		}


		[HttpPost("login")]
		public async Task<ActionResult> Login(UsuarioLoginDto usuarioLogin)
		{

			var resposta = await _authInterface.Login(usuarioLogin);

			return Ok(resposta);
		}



		[HttpPost("register")]
		public async Task<ActionResult> Register(UsuarioRegisterDto usuarioRegister)
		{

			var resposta = await _authInterface.Registrar(usuarioRegister);

			return Ok(resposta);
		}

		[HttpGet("confirmar-email")]
		public async Task<ActionResult> ConfirmarEmail([FromQuery] string token)
		{
			var result = await _authInterface.ConfirmarEmail(token);

			if (!result.Status)
			{
				return Ok(result);
			}

			return Ok(result);
		}

	}
}
