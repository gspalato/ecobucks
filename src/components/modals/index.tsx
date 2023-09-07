import { Dimensions } from 'react-native';
import { createModalStack, ModalStackConfig } from 'react-native-modalfy';
import { Easing } from 'react-native-reanimated';
import tw from 'twrnc';

import SelectItemModal from './SelectItemModal';

import { SelectItemDefinition } from '../Select';

const { height, width } = Dimensions.get('screen');

export interface ModalStackParamsList {
	SelectItemModal: {
		items: SelectItemDefinition[];
		setItem: (item: SelectItemDefinition) => void;
	};
}

export const modalConfig: ModalStackConfig = {
	SelectItemModal: {
		modal: SelectItemModal,
		position: 'bottom',
		backdropOpacity: 0.4,
		containerStyle: tw`w-full`,
		animateInConfig: {
			easing: Easing.inOut(Easing.exp),
			duration: 300,
		},
		animateOutConfig: {
			easing: Easing.inOut(Easing.exp),
			duration: 500,
		},
		transitionOptions: (animatedValue) => ({
			transform: [
				{
					translateY: animatedValue.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [height, 0, height],
					}),
				},
			],
		}),
	},
};

export const defaultOptions = { backdropOpacity: 0.6 };

export const modalStack = createModalStack(modalConfig, defaultOptions);
