import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import tw from 'twrnc';

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
						<RegisterButton />
					</>
				)}
			</View>
		</View>
	);
};

export default Component;

const MapButton: React.FC = () => {
	const onPress = () => {
		router.push('map');
	};

	return (
		<Pressable onPress={onPress}>
			<View style={tw`p-1`}>
				<FontAwesome name='map-marker' size={24} color='black' />
			</View>
		</Pressable>
	);
};

const ScanButton: React.FC = () => {
	const onPress = () => {
		router.push('scan');
	};

	return (
		<Pressable onPress={onPress}>
			<View style={tw`p-1`}>
				<Ionicons name='scan' size={24} color='black' />
			</View>
		</Pressable>
	);
};

const RegisterButton: React.FC = () => {
	const onPress = () => {
		router.push('register');
	};

	return (
		<Pressable onPress={onPress}>
			<View style={tw`p-1`}>
				<Ionicons name='add' size={24} color='black' />
			</View>
		</Pressable>
	);
};
