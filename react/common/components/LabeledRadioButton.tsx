import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {ColorSchema} from '../ui/ColorSchema';
import {LabelTheme} from '../ui/Themes';
import {ColumnLayout, RowLayout} from './Layouts';

export function LabeledRadioButton(props: {
  label: string;
  selected: string;
  options: string[];
  labels: string[];
  style?: StyleProp<ViewStyle>;
  onChange: (newValue: string) => void;
}) {
  return (
    <ColumnLayout style={props.style}>
      <Text variant="labelMedium" theme={LabelTheme}>
        {props.label}
      </Text>

      <RadioButton.Group
        onValueChange={newValue => props.onChange(newValue)}
        value={props.selected}>
        <RowLayout
          style={{
            paddingStart: 16,
          }}>
          {props.options.map((_, index) => {
            return (
              <RowLayout key={index}>
                <Text
                  style={{
                    alignSelf: 'center',
                  }}>
                  {props.labels[index]}
                </Text>

                <RadioButton.Android
                  color={ColorSchema.primary}
                  uncheckedColor={ColorSchema.primary}
                  value={props.options[index]}
                />
              </RowLayout>
            );
          })}
        </RowLayout>
      </RadioButton.Group>
    </ColumnLayout>
  );
}
