namespace Livraria.Dto.Usuario
{
	public record UsuarioReadDto(
		int Id,
		string Username,
		string Email,
		DateTime DataRegistro
	);
}
