import {ColorSchema} from '../common/ui/ColorSchema';
import {Text, View} from 'react-native';

export default function MeasuresScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorSchema.blueBackground,
        justifyContent: 'center',
      }}>
      <Text>Measures</Text>
    </View>
  );
}
