import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	blurView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	bottomTabBar: {
		backgroundColor: 'transparent',
	},
});

export default function TabBar(props) {
	return (
		<BlurView tint='light' intensity={90} style={styles.blurView}>
			<View {...props} style={styles.bottomTabBar} />
		</BlurView>
	);
}
