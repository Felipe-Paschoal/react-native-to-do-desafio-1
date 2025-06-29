import { ItemType } from '@/@types/Item';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ITEMS_STORAGE_KEY = '@todo-desafio-1:items';

async function get(): Promise<ItemType[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error('GET_ITEMS: ' + error);
  }
}

async function save(items: ItemType[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error('ITEMS_SAVE: ' + error);
  }
}

async function add(newItem: ItemType): Promise<ItemType[]> {
  const items = await get();
  const updatedItems = [...items, newItem];
  await save(updatedItems);

  return updatedItems;
}

async function remove(id: string): Promise<void> {
  const items = await get();
  const updatedItems = items.filter((item) => item.id !== id);
  await save(updatedItems);
}

async function toggleDone(id: string): Promise<void> {
  const items = await get();

  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          done: !item.done,
        }
      : item
  );

  await save(updatedItems);
}

export const itemsStorage = {
  get,
  save,
  add,
  remove,
  toggleDone,
};
