import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import tw from 'twrnc';

import DefaultHeader from '@/components/DefaultHeader';
import SafeView from '@/components/SafeView';

const Component: React.FC = (props) => {
	return (
		<SafeView style={[tw`flex-1`]}>
			<DefaultHeader title='Store' />
			<ScrollView style={Styles.list}>
				<Text>henlo</Text>
			</ScrollView>
		</SafeView>
	);
};

export default Component;

const Styles = {
	list: [tw`flex-1`],
};
