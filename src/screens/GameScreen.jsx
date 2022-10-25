import { useState, useEffect } from 'react'
import { View, StyleSheet, Alert, FlatList, Text } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from '../components/game/GuessLogItem'

const generateRandomBetween = (min, max, exclude) => {
	const rndNum = Math.floor(Math.random() * (max - min)) + min

	if (rndNum == exclude) {
		return generateRandomBetween(min, max, exclude)
	} else {
		return rndNum
	}
}

let minBoundary = 1
let maxBoundary = 100

const GameScreen = ({ userNumber, onGameOver }) => {
	const initialGuess = generateRandomBetween(1, 100, userNumber)
	const [currentGuess, setCurrentGuess] = useState(initialGuess)
	const [guessRounds, setGuessRounds] = useState([initialGuess])

	const nextGuessHandler = (direction) => {
		if (
			(direction === 'lower' && currentGuess < userNumber) ||
			(direction === 'greater' && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie!", 'You know that this is wrong...', [
				{ text: 'Sorry!', style: 'cancel' },
			])

			return
		}

		if (direction === 'lower') {
			maxBoundary = currentGuess
		} else {
			minBoundary = currentGuess + 1
		}

		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		)
		setCurrentGuess(newRndNumber)
		setGuessRounds((prev) => [newRndNumber, ...prev])
	}

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(guessRounds.length)
		}
	}, [currentGuess, userNumber, onGameOver])

	useEffect(() => {
		minBoundary = 1
		maxBoundary = 100
	}, [])

	const guessRoundsListLength = guessRounds.length

	return (
		<View style={styles.screen}>
			<Title>Opponent's Guess</Title>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText>Higher or lower?</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							onPress={() => nextGuessHandler('lower')}
						>
							<Ionicons name='md-remove' size={24} color='#fff' />
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							onPress={() => nextGuessHandler('greater')}
						>
							<Ionicons name='md-add' size={24} color='#fff' />
						</PrimaryButton>
					</View>
				</View>
			</Card>
			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds}
					renderItem={(item) => (
						<GuessLogItem
							roundNumber={guessRoundsListLength - item.index}
							guess={item.item}
						/>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 40,
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
})

export default GameScreen
