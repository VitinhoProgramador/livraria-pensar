using Livraria.Data;
using Livraria.Dto.Usuario;
using Livraria.Models;
using Livraria.Services.Auth.Email;
using Livraria.Services.Auth.Senha;
using Livraria.Services.Autor;
using Microsoft.EntityFrameworkCore;

namespace Livraria.Services.Auth
{
	public class AuthService : IAuthInterface
	{
		private readonly AppDbContext _context;
		private readonly ISenhaInterface _senhaInterface;
		private readonly IEmailInterface _emailInterface;

		public AuthService(AppDbContext context, ISenhaInterface senhaInterface, IEmailInterface emailInterface)
		{
			_context = context;
			_senhaInterface = senhaInterface;
			_emailInterface = emailInterface;
		}

		public async Task<ResponseModel<UsuarioRegisterDto>> Registrar(UsuarioRegisterDto usuarioRegister)
		{
			ResponseModel<UsuarioRegisterDto> respostaService = new();

			try
			{
				// Verifica se usuário ou email já existem
				var userExistente = await _context.Usuario.AnyAsync(u => u.Usuario == usuarioRegister.Usuario);
				var emailExistente = await _context.Usuario.AnyAsync(u => u.Email == usuarioRegister.Email);

				if (userExistente || emailExistente)
				{
					respostaService.Status = false;
					respostaService.Mensagem = "Email ou Usuário já cadastrado";
					return respostaService;
				}

				_senhaInterface.CriarSenhaHash(usuarioRegister.Senha, out byte[] senhaHash, out byte[] senhaSalt);

				string tokenAtivacao = Guid.NewGuid().ToString();

				UsuarioModel usuario = new UsuarioModel()
				{
					Usuario = usuarioRegister.Usuario,
					Email = usuarioRegister.Email,
					SenhaHash = senhaHash,
					SenhaSalt = senhaSalt,
					IsAtivo = false,
					AtivacaoToken = tokenAtivacao,
					DataRegistro = DateTime.UtcNow,
					TokenDataCriacao = DateTime.UtcNow,

				};

				await _context.AddAsync(usuario);
				await _context.SaveChangesAsync();

				// Link de ativação
				string linkAtivacao = $"http://localhost:5173/confirmar-email?token={tokenAtivacao}";

				string corpoEmail = $@"
                <h1>Bem-vindo a Livraria Pensar!</h1>
                <p>Para começares a usar nosso site e aproveitar a leitura, precisa confirmar o teu e-mail.</p>
                <a href='{linkAtivacao}' style='background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Confirmar Minha Conta</a>";

				await _emailInterface.EnviarEmail(usuario.Email, "Ativação de Conta - Livraria Pensar", corpoEmail);

				respostaService.Mensagem = "Utilizador registado! Por favor, verifica o teu e-mail para ativar a conta.";
				return respostaService;
			}
			catch (Exception ex)
			{
				respostaService.Mensagem = "Erro ao registrar: " + ex.Message;
				respostaService.Status = false;
			}
			return respostaService;
		}

		public async Task<ResponseModel<string>> Login(UsuarioLoginDto usuarioLogin)
		{
			ResponseModel<string> respostaService = new();
			try
			{
				var usuario = await _context.Usuario.FirstOrDefaultAsync(u => u.Email == usuarioLogin.Email);

				if (usuario == null || !_senhaInterface.VerificaSenhaHash(usuarioLogin.Senha, usuario.SenhaHash, usuario.SenhaSalt))
				{
					respostaService.Mensagem = "Credenciais Inválidas";
					respostaService.Status = false;
					return respostaService;
				}

				if (!usuario.IsAtivo)
				{
					respostaService.Status = false;
					respostaService.Mensagem = "Esta conta ainda não foi ativada. Verifica o teu e-mail!";
					return respostaService;
				}

				var token = _senhaInterface.CriarToken(usuario);
				var refreshToken = _senhaInterface.GerarRefreshToken();

				usuario.RefreshToken = refreshToken;
				usuario.TokenDataExpiracao = DateTime.UtcNow.AddDays(7);

				_context.Update(usuario);
				await _context.SaveChangesAsync();

				respostaService.Dados = token;
				respostaService.Mensagem = refreshToken;
				respostaService.Status = true;
			}
			catch (Exception) { respostaService.Status = false; }
			return respostaService;
		}

		public async Task<ResponseModel<string>> ConfirmarEmail(string token)
		{
			ResponseModel<string> response = new();

			var usuario = await _context.Usuario.FirstOrDefaultAsync(u => u.AtivacaoToken == token);

			if (usuario == null)
			{
				// Se não achou o token, não damos erro "duro". 
				// Dizemos que está ok, pois provavelmente o React já ativou na primeira chamada.
				response.Mensagem = "Conta já verificada ou link expirado.";
				response.Status = true; // <--- Mantenha true aqui para o React não reclamar
				return response;
			}

			usuario.IsAtivo = true;
			usuario.AtivacaoToken = null;

			_context.Update(usuario);
			await _context.SaveChangesAsync();

			response.Mensagem = "Conta ativada com sucesso!";
			response.Status = true;
			return response;
		}

		public async Task<bool> VerificaSeEmaileUsuarioExiste(UsuarioRegisterDto usuarioRegister)
		{
			bool usuarioExiste = await _context.Usuario
				.AnyAsync(u => u.Usuario == usuarioRegister.Usuario);

			bool emailExiste = await _context.Usuario
				.AnyAsync(u => u.Email == usuarioRegister.Email);

			return usuarioExiste || emailExiste;
		}
	}
}
