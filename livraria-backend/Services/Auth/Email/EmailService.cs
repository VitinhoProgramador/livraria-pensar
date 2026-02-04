using MailKit.Net.Smtp;
using MimeKit;

namespace Livraria.Services.Auth.Email
{
	public class EmailService : IEmailInterface
	{
		private readonly IConfiguration _config;
		public EmailService(IConfiguration config) { _config = config; }

		public async Task EnviarEmail(string destinatario, string assunto, string mensagem)
		{
			var email = new MimeMessage();
			email.From.Add(new MailboxAddress(_config["EmailSettings:SenderName"], _config["EmailSettings:SenderEmail"]));
			email.To.Add(MailboxAddress.Parse(destinatario));
			email.Subject = assunto;
			email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = mensagem };

			using var smtp = new SmtpClient();

			await smtp.ConnectAsync(_config["EmailSettings:SmtpServer"],
								   int.Parse(_config["EmailSettings:Port"]!),
								   MailKit.Security.SecureSocketOptions.StartTls);

			await smtp.AuthenticateAsync(_config["EmailSettings:SenderEmail"], _config["EmailSettings:Password"]);
			await smtp.SendAsync(email);
			await smtp.DisconnectAsync(true);
		}

	}
}
