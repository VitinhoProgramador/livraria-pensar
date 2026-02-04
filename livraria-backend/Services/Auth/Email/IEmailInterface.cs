namespace Livraria.Services.Auth.Email
{
	public interface IEmailInterface
	{
		Task EnviarEmail(string destinatario, string assunto, string mensagem);
	}
}
