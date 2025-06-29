import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { ItemType } from '../../@types/Item';
import { MaterialIcons } from '@expo/vector-icons';

export function Item(props: {
  ItemType: ItemType;
  onRemove: (event: any) => void;
  onCheck: (event: any) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        backgroundColor: '#262626',
        padding: 12,
        borderRadius: 6,
      }}
    >
      <TouchableOpacity
        style={{
          minWidth: 20,
          minHeight: 20,
          borderWidth: 2,
          borderColor: props.ItemType.done ? '#5E60CE' : '#4EA8DE',
          backgroundColor: props.ItemType.done ? '#5E60CE' : 'transparent',
          borderRadius: 50,
        }}
        onPress={props.onCheck}
      >
        <Text style={{ fontSize: 10, paddingLeft: 4, color: '#FFF' }}>
          {props.ItemType.done ? '✔' : ''}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 14,
          color: '#F2F2F2',
          flex: 1,
          textDecorationLine: props.ItemType.done ? 'line-through' : 'none',
          opacity: props.ItemType.done ? 0.6 : 1,
        }}
      >
        {props.ItemType.description}
      </Text>

      <Pressable
        style={({ pressed }) => {
          return {
            opacity: pressed ? 0.7 : 1,
            backgroundColor: pressed ? 'red' : 'transparent',
            borderRadius: 4,
          };
        }}
        onPress={props.onRemove}
      >
        <MaterialIcons name="delete-outline" size={20} color={'#808080'} />
      </Pressable>
    </View>
  );
}
