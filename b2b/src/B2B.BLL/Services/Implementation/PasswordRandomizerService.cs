using System;
using System.Collections.Generic;

namespace B2B.BLL.Services.Implementation
{
    public class PasswordRandomizerService : IPasswordRandomizerService
    {
        private List<int> _randomNumbers;

        private List<char> _randomCharacters;

        public string GetRandomPassword(int numbersCount, int charactersCount)
        {
            _randomNumbers = new List<int>(numbersCount);
            _randomCharacters = new List<char>(charactersCount);

            FillRandomNumbers(numbersCount);
            FillRandomCharacters(charactersCount);

            var numbersS = string.Join(string.Empty, _randomNumbers);
            var charsS = string.Join(string.Empty, _randomCharacters);

            return $"{charsS}{numbersS}";
        }

        private void FillRandomNumbers(int numbersCount)
        {
            var random = new Random();

            for (var i = 0; i < numbersCount; i++)
            {
                _randomNumbers.Add(random.Next(0, 9));
            }
        }

        private void FillRandomCharacters(int charactersCount)
        {
            var random = new Random();
            var charactersCountMiddle = charactersCount / 2;

            for (var i = 0; i < charactersCountMiddle; i++)
            {
                _randomCharacters.Add((char)random.Next(65, 90));
            }

            for (var i = 0; i < charactersCount - charactersCountMiddle; i++)
            {
                _randomCharacters.Add((char)random.Next(97, 122));
            }
        }
    }
}
