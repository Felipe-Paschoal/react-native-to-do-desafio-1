import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { FlatList, Image, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Item } from '@/components/Item';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
      <View
        style={{
          paddingTop: 48,
          height: 170,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Image
          style={{ height: 32, width: 110 }}
          source={require('@/assets/Logo.png')}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginTop: -24,
            paddingHorizontal: 24,
          }}
        >
          <Input
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor="#808080"
            style={{ flex: 1 }}
          />

          <Button>
            <MaterialIcons
              name="add-circle-outline"
              color={'white'}
              size={16}
            />
          </Button>
        </View>
        <View style={{ padding: 24 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: '#333333',
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 700, color: '#4EA8DE' }}>
                Criadas
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  width: 25,
                  borderRadius: 24,
                  color: '#D9D9D9',
                  backgroundColor: '#333333',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                0
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 700, color: '#8284FA' }}>
                Concluídas
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  width: 25,
                  borderRadius: 24,
                  color: '#D9D9D9',
                  backgroundColor: '#333333',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                0
              </Text>
            </View>
          </View>
          <FlatList
            style={{ marginTop: 24 }}
            data={['']}
            renderItem={() => {
              return (
                <Item
                  ItemType={{ description: 'teste', done: false, id: 1 }}
                  onCheck={() => {}}
                  onRemove={() => {}}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    paddingVertical: 48,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                  }}
                >
                  <MaterialIcons
                    name="assignment"
                    size={56}
                    color={'#333333'}
                    style={{ marginBottom: 16 }}
                  />
                  <Text
                    style={{ fontSize: 14, fontWeight: 700, color: '#808080' }}
                  >
                    Você ainda não tem tarefas cadastradas
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: 400, color: '#808080' }}
                  >
                    Crie tarefas e organize seus itens a fazer
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}
