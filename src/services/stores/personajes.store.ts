import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { 
  CharacterType } from "../../types/data";


interface StoreState {
  personajes: CharacterType[];
  getPersonajes: () => CharacterType[];
  addOnePersonaje: (item: CharacterType) => void;
  addPersonajes: (item: CharacterType[]) => void;
  editPersonajes: (item: CharacterType) => void;
  removePersonaje: (id: number) => void;
  removeAllPersonajes: () => void;
  getPagination: () => number;
}


const storeApi: StateCreator<StoreState> = (set, get) => ({
  personajes: [],
  getPersonajes: () => get().personajes,
  addOnePersonaje: (item: CharacterType) => {
    set((state) => {
      item.id =  state.personajes.length + 1
      const updatedPersonajes = [...state.personajes, item];
      return { personajes: updatedPersonajes };
    });
  },
  addPersonajes: (items: CharacterType[]) => {
    set((state) => {
      // Crear un mapa para verificar rápidamente los IDs existentes
      const existingIds = new Set(state.personajes.map((char) => char.id));
      
      // Filtrar los nuevos personajes que ya están en el store
      const newPersonajes = items.filter((item) => !existingIds.has(item.id));
      
      // Retornar el nuevo estado con los personajes agregados
      return { personajes: [...state.personajes, ...newPersonajes] };
    });
  },
  editPersonajes: (item: CharacterType) => {
    set((state) => {
      const updatedPersonajes = state.personajes.map((char) => {
        if (char.id === item.id) {
          return { ...char, ...item };
        }
        return char;
      });
      return { personajes: updatedPersonajes };
    });
  },
  removePersonaje: (id) => {
    set((state) => {
      const updatedPersonajes = state.personajes.filter((char) => char.id !== id);
      return { personajes: updatedPersonajes };
    });
  },
  removeAllPersonajes: () => set(() => ({ personajes: []})),
  getPagination: () => {
    const total = get().personajes.length;
    const pagination = Math.ceil(total / 20);
    return pagination;
  }
});

export const useCharactersStore = create<StoreState>()(
  persist(
    storeApi,
    {
      name: 'personajes-ram',
      storage: createJSONStorage(() => localStorage),
    })
);