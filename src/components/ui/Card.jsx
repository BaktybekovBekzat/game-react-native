import { StyleSheet, View } from 'react-native'
import Colors from '../../../constants/colors'

const Card = ({ children }) => {
	return <View style={styles.card}>{children}</View>
}

const styles = StyleSheet.create({
	card: {
		marginTop: 36,
		marginHorizontal: 20,
		padding: 10,
		backgroundColor: Colors.primary800,
		borderRadius: 8,
		elevation: 4,
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowOffset: {
			widthg: 0,
			height: 2,
		},
		shadowRadius: 6,
		alignItems: 'center',
	},
})

export default Card
