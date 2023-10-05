import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';

const Component = () => {
	const selectedColor = '#000000ff';
	const unselectedColor = '#00000044';

	return (
		<View style={Styles.container}>
			<TouchableOpacity hitSlop={50} style={Styles.tabButton.container}>
				<Ionicons name='home' size={25} color={selectedColor} />
				<Text style={[Styles.tabButton.text, { color: selectedColor }]}>
					Home
				</Text>
			</TouchableOpacity>
			<TouchableOpacity hitSlop={50} style={Styles.tabButton.container}>
				<Ionicons
					name='map-outline'
					size={25}
					color={unselectedColor}
				/>
				<Text
					style={[Styles.tabButton.text, { color: unselectedColor }]}
				>
					Map
				</Text>
			</TouchableOpacity>
			<TouchableOpacity hitSlop={50} style={Styles.tabButton.container}>
				<Ionicons name='scan' size={25} color={unselectedColor} />
				<Text
					style={[Styles.tabButton.text, { color: unselectedColor }]}
				>
					Scan
				</Text>
			</TouchableOpacity>
			<TouchableOpacity hitSlop={50} style={Styles.tabButton.container}>
				<Ionicons
					name='gift-outline'
					size={25}
					color={unselectedColor}
				/>
				<Text
					style={[Styles.tabButton.text, { color: unselectedColor }]}
				>
					Store
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Component;

const Styles = {
	container: [
		tw`flex h-20 w-full flex-row items-center justify-center gap-12`,
	],
	tabButton: {
		container: [tw`flex items-center justify-center gap-1`],
		icon: [],
		text: [{ fontFamily: 'Syne_700Bold', color: '#11da33' }],
	},
};
