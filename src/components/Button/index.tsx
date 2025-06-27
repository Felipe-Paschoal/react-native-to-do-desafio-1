import { Pressable, PressableProps } from 'react-native';

export type ButtonProps = PressableProps;

export function Button({ ...rest }: ButtonProps) {
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => {
        return {
          opacity: pressed ? 0.7 : 1,
          width: 52,
          height: 52,
          borderRadius: 6,
          backgroundColor: '#1E6F9F',
          alignItems: 'center',
          justifyContent: 'center',
        };
      }}
    />
  );
}
