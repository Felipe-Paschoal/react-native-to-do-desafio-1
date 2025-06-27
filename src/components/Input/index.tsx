import { TextInput, TextInputProps } from 'react-native';

export type InputType = TextInputProps;

export function Input({ style, ...rest }: InputType) {
  return (
    <TextInput
      {...rest}
      style={{
        minHeight: 52,
        borderRadius: 6,
        backgroundColor: '#262626',
        paddingHorizontal: 16,
        color: '#F2F2F2',
        ...(Array.isArray(style) ? Object.assign({}, ...style) : style || {}),
      }}
    />
  );
}
