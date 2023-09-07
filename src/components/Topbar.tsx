import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

import IconButton from '@/components/IconButton';

import BackButton from './BackButton';

interface ITopbarProps {
	isOperator?: boolean;
}

const Component: React.FC<ITopbarProps> = (props) => {
	const { isOperator } = props;

	return (
		<View
			style={tw`min-h-12 flex w-full flex-row items-center justify-between border-b border-b-[#00000011] px-4 pb-2`}
		>
			<Text
				style={[
					tw`font-bold text-[#11da33] text-[9]`,
					{ fontFamily: 'Space Grotesk Bold', fontWeight: 'bold' },
				]}
			>
				ecobucks
			</Text>
			<View style={tw`flex flex-row gap-4`}>
				<MapButton />
				<ScanButton />
				{isOperator && (
					<>
						<View style={tw`my-1 border-l border-[#00000011]`} />
						<IconButton path='/add/' icon='add' />
					</>
				)}
			</View>
		</View>
	);
};

export default Component;

const MapButton: React.FC = () => {
	const onPress = () => {
		router.replace('/map');
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={tw`p-1`}>
				<FontAwesome name='map-marker' size={24} color='black' />
			</View>
		</TouchableOpacity>
	);
};

const ScanButton: React.FC = () => {
	const onPress = () => {
		router.replace('/scan');
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={tw`p-1`}>
				<Ionicons name='scan' size={24} color='black' />
			</View>
		</TouchableOpacity>
	);
};

const RegisterButton: React.FC = () => {
	const onPress = () => {
		router.replace('/add/');
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={tw`p-1`}>
				<Ionicons name='add' size={24} color='black' />
			</View>
		</TouchableOpacity>
	);
};
