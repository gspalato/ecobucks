import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import tw from 'twrnc';

import { getFontSize } from '@/lib/fonts';

import { DisposalType } from '@/types/DisposalClaim';

type Transaction =
	| {
			action: 'claim';
			weight?: number;
			credits: number;
			type: DisposalType;
	  }
	| {
			action: 'spend';
			credits: number;
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

	return (
		<ScrollView style={[Styles.container, style]}>
			{transactions.reverse().map((item, i) => (
				<View
					key={item.action + i}
					style={Styles.transactionItem.container}
				>
					<View style={Styles.transactionItem.detail.container}>
						<Text style={Styles.transactionItem.detail.title}>
							{item.action == 'claim' ? 'Claimed' : 'Spent'}{' '}
						</Text>
						<Text style={Styles.transactionItem.detail.description}>
							{item.action == 'claim'
								? `Safely disposed ${item.weight}kg of ${
										DisposalTypeName[item.type]
								  } waste.`
								: 'Spent on rewards'}
						</Text>
					</View>
					<View style={Styles.transactionItem.credit.container}>
						<Text style={Styles.transactionItem.credit.text}>
							{item.action == 'spend' ? '-' : '+'}${item.credits}
						</Text>
					</View>
				</View>
			))}
		</ScrollView>
	);
};

Component.displayName = 'RecentTransactionList';

export default Component;

const Styles = {
	container: tw`flex w-full flex-col gap-2`,
	title: [tw`mb-3 text-center text-2xl`, { fontFamily: 'Syne_600SemiBold' }],
	transactionItem: {
		container: [
			tw`min-h-20 mb-2 w-full flex-row justify-center rounded-xl border border-[#00000011] p-3`,
		],
		detail: {
			container: [tw`flex-1 flex-col justify-center`],
			title: [
				tw`pb-2 `,
				{ fontSize: getFontSize(17), fontFamily: 'Syne_500Medium' },
			],
			description: [
				tw`text-black/60 `,
				{ fontFamily: 'Inter_400Regular', fontSize: getFontSize(15) },
			],
		},
		credit: {
			container: [tw`flex items-center justify-center`],
			text: [
				tw`text-center `,
				{
					fontSize: getFontSize(15),
					fontFamily: 'BricolageGrotesque_700Bold',
				},
			],
		},
	},
};
