using Livraria.Models;

namespace Livraria.Services.Auth.Senha
{
	public interface ISenhaInterface
	{
		void CriarSenhaHash(string senha, out byte[] senhaHash, out byte[] senhaSalt);
		bool VerificaSenhaHash(string senha, byte[] senhaHash, byte[] senhaSalt);
		public string CriarToken(UsuarioModel usuario);
		string GerarRefreshToken();
	}
}
