import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Ingredient } from '../data/recipes';

export interface ShoppingItem extends Ingredient {
  checked: boolean;
  sourceRecipeIds: string[];
}

interface AppState {
  savedRecipeIds: string[];
  shoppingList: ShoppingItem[];
  isLifetimeUnlocked: boolean;
  preferences: {
    unit: 'gram/ml' | 'sendok/gelas';
    spiceLevel: 'Sedang' | 'Pedas' | 'Sangat Pedas';
  };
  
  // Actions
  toggleSaveRecipe: (id: string) => void;
  addRecipeToShoppingList: (recipeId: string, ingredients: Ingredient[], servingsRatio: number) => void;
  toggleShoppingItem: (id: string) => void;
  clearCheckedShoppingItems: () => void;
  unlockLifetime: () => void;
  updatePreference: (key: keyof AppState['preferences'], value: any) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      savedRecipeIds: [],
      shoppingList: [],
      isLifetimeUnlocked: false,
      preferences: {
        unit: 'gram/ml',
        spiceLevel: 'Sedang',
      },

      toggleSaveRecipe: (id) => set((state) => {
        const isSaved = state.savedRecipeIds.includes(id);
        return {
          savedRecipeIds: isSaved
            ? state.savedRecipeIds.filter((rid) => rid !== id)
            : [...state.savedRecipeIds, id],
        };
      }),

      addRecipeToShoppingList: (recipeId, ingredients, servingsRatio) => set((state) => {
        const newList = [...state.shoppingList];
        
        ingredients.forEach((ing) => {
          const existingItemIndex = newList.findIndex(
            (item) => item.name.toLowerCase() === ing.name.toLowerCase() && item.unit === ing.unit
          );

          const addedQty = ing.qty * servingsRatio;

          if (existingItemIndex >= 0) {
            newList[existingItemIndex].qty += addedQty;
            if (!newList[existingItemIndex].sourceRecipeIds.includes(recipeId)) {
              newList[existingItemIndex].sourceRecipeIds.push(recipeId);
            }
          } else {
            newList.push({
              ...ing,
              qty: addedQty,
              checked: false,
              sourceRecipeIds: [recipeId],
            });
          }
        });

        return { shoppingList: newList };
      }),

      toggleShoppingItem: (id) => set((state) => ({
        shoppingList: state.shoppingList.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        ),
      })),

      clearCheckedShoppingItems: () => set((state) => ({
        shoppingList: state.shoppingList.filter((item) => !item.checked),
      })),

      unlockLifetime: () => set({ isLifetimeUnlocked: true }),

      updatePreference: (key, value) => set((state) => ({
        preferences: { ...state.preferences, [key]: value },
      })),
    }),
    {
      name: 'masaka-storage',
    }
  )
);
