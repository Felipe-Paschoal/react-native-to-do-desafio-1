import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Alert, FlatList, Image, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Item } from '@/components/Item';
import { useEffect, useState } from 'react';
import { ItemType } from '@/@types/Item';
import { itemsStorage } from '@/storage/itemsStorage';

export default function App() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [itemsDone, setItemsDone] = useState<number>(0);
  const [description, setDescription] = useState('');

  async function getItems() {
    try {
      const response = await itemsStorage.get();
      setItems(response);
      setItemsDone(response.filter((item) => item.done).length);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível filtrar os itens.');
    }
  }

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert('Adicionar', 'Informe a descrição para adicionar.');
    }

    const newItem = {
      id: Math.random().toString().substring(15),
      description,
      done: false,
    };

    await itemsStorage.add(newItem);
    await getItems();

    setDescription('');
  }

  async function handleToggleItemDone(id: string) {
    try {
      await itemsStorage.toggleDone(id);
      await getItems();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o status.');
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await getItems();
    } catch (error) {
      Alert.alert('Remover', 'Não foi possível remover o item.');
    }
  }

  useEffect(() => {
    getItems();
  }, []);

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
            value={description}
            onChangeText={setDescription}
          />

          <Button onPress={handleAdd}>
            <MaterialIcons
              name="add-circle-outline"
              color={'white'}
              size={16}
            />
          </Button>
        </View>
        <View style={{ flex: 1, padding: 24 }}>
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
                {items.length}
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
                {itemsDone}
              </Text>
            </View>
          </View>
          <FlatList
            style={{ marginTop: 24, marginBottom: 24 }}
            contentContainerStyle={{ gap: 8 }}
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <Item
                  ItemType={item}
                  onCheck={() => handleToggleItemDone(item.id)}
                  onRemove={() => handleRemove(item.id)}
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
