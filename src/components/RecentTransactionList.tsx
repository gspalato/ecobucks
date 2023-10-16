import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import tw from 'twrnc';

import { fontSizes, getFontSize } from '@/lib/fonts';

import { DisposalType } from '@/types/DisposalClaim';

import { Spacings } from '@/styles';

type Transaction = {
	action: 'claim' | 'spend';
	credits: number;
	description: string;
};

type RecentTransactionListProps = {
	style?: StyleProp<ViewStyle>;
	transactions: Transaction[];
};

const DisposalTypeName = {
	[DisposalType.RECYCLABLE]: 'Recyclable',
	[DisposalType.SPONGE]: 'Sponge',
	[DisposalType.BATTERY]: 'Battery',
	[DisposalType.ELECTRONIC]: 'Electronic',
};

const Component: React.FC<RecentTransactionListProps> = (props) => {
	const { style, transactions } = props;

	const transactionComponents = useMemo(
		() =>
			transactions.reverse().map((item, i) => (
				<View
					key={item.action + i}
					style={Styles.transactionItemContainer}
				>
					<View
						style={{
							alignItems: 'center',
							aspectRatio: 1,
							backgroundColor: '#0000000d',
							borderRadius: 100,
							display: 'flex',
							justifyContent: 'center',
							width: 40,
						}}
					>
						<Ionicons
							name={
								item.action == 'claim'
									? 'arrow-down'
									: 'arrow-up'
							}
							size={25}
							color='#000'
							style={{ transform: [{ rotate: '45deg' }] }}
						/>
					</View>
					<View style={Styles.transactionItemDetailContainer}>
						<Text style={Styles.transactionItemDetailTitle}>
							{item.action == 'claim' ? 'Claimed' : 'Spent'}{' '}
						</Text>
						<Text style={Styles.transactionItemDetailDescription}>
							{item.description}
						</Text>
					</View>
					<View style={Styles.transactionItemDetailCreditContainer}>
						<Text style={Styles.transactionItemDetailCreditText}>
							{item.action == 'spend' ? '-' : '+'}${item.credits}
						</Text>
					</View>
				</View>
			)),
		[transactions],
	);

	return (
		<View style={[Styles.container, style]}>
			{transactions.length > 0 ? (
				transactionComponents
			) : (
				<Text
					style={[
						tw`text-center text-[#00000044]`,
						{ fontSize: getFontSize(15) },
					]}
				>
					You haven't done any transactions recently.
				</Text>
			)}
		</View>
	);
};

Component.displayName = 'RecentTransactionList';

export default Component;

const Styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		gap: 4 * Spacings.Unit,
		width: '100%',
	},
	title: {
		fontFamily: 'Syne_600SemiBold',
		fontSize: fontSizes.xl,
		marginBottom: 3 * Spacings.Unit,
		textAlign: 'center',
	},
	transactionItemContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 8 * Spacings.Unit,
		justifyContent: 'center',
		marginBottom: 2 * Spacings.Unit,
		minHeight: 20 * Spacings.Unit,
		padding: 4 * Spacings.Unit,
		paddingHorizontal: 0,
		width: '100%',
	},
	transactionItemDetailContainer: { flexGrow: 1, justifyContent: 'center' },
	transactionItemDetailTitle: {
		fontSize: getFontSize(17),
		fontFamily: 'Syne_500Medium',
		paddingBottom: 2 * Spacings.Unit,
	},
	transactionItemDetailDescription: {
		color: '#00000099',
		fontFamily: 'Inter_400Regular',
		fontSize: getFontSize(14),
	},
	transactionItemDetailCreditContainer: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
	},
	transactionItemDetailCreditText: {
		fontSize: getFontSize(15),
		fontFamily: 'BricolageGrotesque_700Bold',
		textAlign: 'center',
	},
});
