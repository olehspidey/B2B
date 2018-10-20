namespace B2B.BLL.Services
{
    public interface IPasswordRandomizerService
    {
        string GetRandomPassword(int numbersCount, int charactersCount);
    }
}
