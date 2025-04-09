import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockRecipes } from '../mock/mockData';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookingTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  substitutions: {
    original: string;
    alternatives: string[];
  }[];
  instructions: string[];
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
  rating: number;
  tags: string[];
  dietaryInfo: string[];
}

interface UserFavorites {
  [userId: string]: string[];
}

interface RecipeState {
  recipes: Recipe[];
  userRecipes: Recipe[];
  favorites: UserFavorites;
  isLoading: boolean;
  error: string | null;
  fetchRecipes: () => Promise<void>;
  fetchUserRecipes: (userId: string) => Promise<void>;
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => Promise<Recipe>;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => Promise<Recipe>;
  deleteRecipe: (id: string) => Promise<void>;
  toggleFavorite: (userId: string, recipeId: string) => void;
  getUserFavorites: (userId: string) => string[];
  getRecipeById: (id: string) => Recipe | undefined;
  searchRecipes: (query: string) => Recipe[];
  filterRecipesByDiet: (diet: string) => Recipe[];
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      recipes: mockRecipes,
      userRecipes: [],
      favorites: {},
      isLoading: false,
      error: null,
      
      fetchRecipes: async () => {
        set({ isLoading: true, error: null });
        try {
          // Only initialize with mock recipes if there are no recipes
          const currentRecipes = get().recipes;
          if (currentRecipes.length === 0) {
            set({ recipes: mockRecipes });
          }
          set({ isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch recipes', isLoading: false });
        }
      },

      fetchUserRecipes: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const userRecipes = get().recipes.filter(recipe => recipe.author.id === userId);
          set({ userRecipes, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch user recipes', isLoading: false });
        }
      },

      addRecipe: async recipeData => {
        set({ isLoading: true, error: null });
        try {
          const newRecipe: Recipe = {
            ...recipeData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
          };
          
          set(state => ({
            recipes: [...state.recipes, newRecipe],
            isLoading: false
          }));
          
          return newRecipe;
        } catch (error) {
          set({ error: 'Failed to add recipe', isLoading: false });
          throw error;
        }
      },

      updateRecipe: async (id, recipeData) => {
        set({ isLoading: true, error: null });
        try {
          const updatedRecipes = get().recipes.map(recipe => 
            recipe.id === id ? { ...recipe, ...recipeData } : recipe
          );
          set({ recipes: updatedRecipes, isLoading: false });
          return updatedRecipes.find(r => r.id === id)!;
        } catch (error) {
          set({ error: 'Failed to update recipe', isLoading: false });
          throw error;
        }
      },

      deleteRecipe: async id => {
        set({ isLoading: true, error: null });
        try {
          const filteredRecipes = get().recipes.filter(recipe => recipe.id !== id);
          set({ recipes: filteredRecipes, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to delete recipe', isLoading: false });
          throw error;
        }
      },

      toggleFavorite: (userId: string, recipeId: string) => {
        set(state => {
          const userFavorites = state.favorites[userId] || [];
          const isFavorite = userFavorites.includes(recipeId);
          const updatedUserFavorites = isFavorite 
            ? userFavorites.filter(id => id !== recipeId)
            : [...userFavorites, recipeId];
          
          return {
            favorites: {
              ...state.favorites,
              [userId]: updatedUserFavorites
            }
          };
        });
      },

      getUserFavorites: (userId: string) => {
        return get().favorites[userId] || [];
      },

      getRecipeById: id => {
        return get().recipes.find(recipe => recipe.id === id);
      },

      searchRecipes: query => {
        const lowerQuery = query.toLowerCase();
        return get().recipes.filter(recipe => 
          recipe.title.toLowerCase().includes(lowerQuery) || 
          recipe.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(lowerQuery)
          )
        );
      },

      filterRecipesByDiet: diet => {
        return get().recipes.filter(recipe => recipe.dietaryInfo.includes(diet));
      }
    }),
    {
      name: 'recipe-storage',
      // Persist both recipes and favorites
      partialize: state => ({
        recipes: state.recipes,
        favorites: state.favorites
      })
    }
  )
);