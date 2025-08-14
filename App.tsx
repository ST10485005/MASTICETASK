import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  // Generate random number between 1 and 100
  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  const [secretNumber, setSecretNumber] = useState<number>(generateRandomNumber());
  const [guess, setGuess] = useState<string>(''); // Store user input as string
  const [feedback, setFeedback] = useState<string>(''); // Feedback for user
  const [guessCount, setGuessCount] = useState<number>(0);

  // Handle guess submission
  const handleGuess = () => {
    const numericGuess = parseInt(guess, 10);
    if (isNaN(numericGuess)) {
      setFeedback('Please enter a valid number.');
      return;
    }

    setGuessCount(prev => prev + 1);

    if (numericGuess < secretNumber) {
      setFeedback('Too low! Try again.');
    } else if (numericGuess > secretNumber) {
      setFeedback('Too high! Try again.');
    } else {
      setFeedback(`Correct! The number was ${secretNumber}.`);
    }

    setGuess('');
  };

  // Restart the game
  const handleRestart = () => {
    setSecretNumber(generateRandomNumber());
    setGuess('');
    setFeedback('');
    setGuessCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mystery Number Challenge</Text>

      <Text>Guess the number between 1 and 100</Text>

      <TextInput
        style={styles.input}
        value={guess}
        onChangeText={setGuess}
        keyboardType="numeric"
        placeholder="Enter your guess"
      />

      <Button title="Submit Guess" onPress={handleGuess} />

      <Text style={styles.feedback}>{feedback}</Text>
      <Text>Number of guesses: {guessCount}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Restart Game" onPress={handleRestart} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 200,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  feedback: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});
