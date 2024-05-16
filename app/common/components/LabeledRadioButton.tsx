import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { ColorSchema } from '../ui/ColorSchema';
import { LabelTheme } from '../ui/Themes';
import { ColumnLayout, RowLayout } from './Layouts';

export function LabeledRadioButton({ label, selected, options, labels, style, onChange }: {
  label: string;
  selected: string;
  options: string[];
  labels: string[];
  style?: StyleProp<ViewStyle>;
  onChange: (newValue: string) => void;
}) {
  return (
    <ColumnLayout style={style}>
      <Text variant="bodySmall" theme={LabelTheme}>
        {label}
      </Text>

      <RadioButton.Group
        onValueChange={newValue => onChange(newValue)}
        value={selected}>
        <RowLayout
          style={{
            paddingStart: 16,
          }}>
          {options.map((_, index) => {
            return (
              <RowLayout key={index}>
                <Text
                  style={{
                    alignSelf: 'center',
                  }}>
                  {labels[index]}
                </Text>

                <RadioButton.Android
                  color={ColorSchema.onSecondary}
                  uncheckedColor={ColorSchema.onSecondary}
                  value={options[index]}
                />
              </RowLayout>
            );
          })}
        </RowLayout>
      </RadioButton.Group>
    </ColumnLayout>
  );
}
