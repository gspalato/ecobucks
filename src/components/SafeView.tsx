import { usePlatform } from "@/lib/platform";
import { StyleProp, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

type SafeViewProps = {
    style?: StyleProp<ViewStyle>;
} & React.PropsWithChildren;

const Component: React.FC<SafeViewProps> = (props) => {
    const { children, style } = props;
    
    const { SafeAreaStyle } = usePlatform();

    return (
        <SafeAreaView style={[SafeAreaStyle, style]}>
            {children}
        </SafeAreaView>
    );
}

export default Component;