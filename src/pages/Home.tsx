import React from 'react';
import { Search, Flame, Clock, Utensils, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useAppStore } from '../store/useAppStore';

export function Home() {
  const navigate = useNavigate();
  const { isLifetimeUnlocked } = useAppStore();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('q');
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  const quickFilters = ['Mudah', 'Hemat', 'Pedas', 'Tanpa Santan', 'Ayam', 'Ikan', 'Sayur'];
  
  const recommended = recipes.slice(0, 3);
  const popular = recipes.slice(3, 5);
  const quickMeals = recipes.filter(r => r.totalTimeMin <= 30);

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-stone-50">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Masak apa hari ini?</h1>
        <p className="text-stone-500 text-sm">Temukan resep Nusantara favoritmu.</p>
      </header>

      <form onSubmit={handleSearch} className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
        <Input 
          name="q"
          placeholder="Cari rendang, soto, sambal..." 
          className="pl-12 bg-white shadow-sm border-stone-200 rounded-2xl h-14"
        />
      </form>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide -mx-4 px-4">
        {quickFilters.map((filter) => (
          <Badge 
            key={filter} 
            variant="outline" 
            className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full cursor-pointer hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors"
            onClick={() => navigate(`/search?tag=${filter}`)}
          >
            {filter}
          </Badge>
        ))}
      </div>

      {!isLifetimeUnlocked && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-5 text-white mb-8 shadow-md flex justify-between items-center cursor-pointer" onClick={() => navigate('/paywall')}>
          <div>
            <h3 className="font-bold text-lg mb-1">Buka Semua Resep</h3>
            <p className="text-orange-100 text-sm">Akses selamanya, tanpa langganan.</p>
          </div>
          <div className="bg-white/20 p-2 rounded-full">
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      )}

      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Rekomendasi Hari Ini
          </h2>
          <Link to="/search" className="text-sm font-medium text-orange-600">Lihat semua</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {recommended.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            30 Menit Jadi
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
          {quickMeals.map(recipe => (
            <div key={recipe.id} className="min-w-[160px] snap-start">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-stone-700" />
            Masakan Daerah
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['Sumatera', 'Jawa', 'Bali-Nusra', 'Sulawesi'].map(region => (
            <div 
              key={region}
              onClick={() => navigate(`/search?region=${region}`)}
              className="bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-center font-medium text-stone-700 shadow-sm cursor-pointer hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              {region}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
