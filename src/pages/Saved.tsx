import React from 'react';
import { Bookmark, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { recipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Button } from '../components/ui/Button';

export function Saved() {
  const navigate = useNavigate();
  const { savedRecipeIds } = useAppStore();
  
  const savedRecipes = recipes.filter(r => savedRecipeIds.includes(r.id));

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-stone-50">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 mb-1 flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-orange-500 fill-orange-100" />
          Resep Tersimpan
        </h1>
        <p className="text-stone-500 text-sm">Koleksi resep favoritmu.</p>
      </header>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {savedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <Bookmark className="w-10 h-10 text-orange-300" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">Belum ada resep disimpan</h2>
          <p className="text-stone-500 text-sm mb-8 max-w-[250px]">
            Coba cari dan simpan resep pertamamu untuk dimasak nanti ✨
          </p>
          <Button 
            onClick={() => navigate('/search')}
            className="h-12 px-8 rounded-xl font-bold"
          >
            <Search className="w-4 h-4 mr-2" />
            Cari Resep
          </Button>
        </div>
      )}
    </div>
  );
}
