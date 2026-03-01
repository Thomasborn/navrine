import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { recipes, Category, Difficulty, Region } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialTag = searchParams.get('tag') || '';
  const initialRegion = searchParams.get('region') || '';

  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    time: '',
    difficulty: '',
    category: '',
    region: initialRegion,
    diet: 'Halal',
    tag: initialTag,
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value
    }));
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchQuery = query === '' || 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(i => i.name.toLowerCase().includes(query.toLowerCase()));
      
      const matchTime = filters.time === '' ? true :
        filters.time === '<15' ? recipe.totalTimeMin < 15 :
        filters.time === '15-30' ? recipe.totalTimeMin >= 15 && recipe.totalTimeMin <= 30 :
        filters.time === '30-60' ? recipe.totalTimeMin > 30 && recipe.totalTimeMin <= 60 :
        recipe.totalTimeMin > 60;

      const matchDifficulty = filters.difficulty === '' || recipe.difficulty === filters.difficulty;
      const matchCategory = filters.category === '' || recipe.category === filters.category;
      const matchRegion = filters.region === '' || recipe.region === filters.region;
      const matchTag = filters.tag === '' || recipe.tags.includes(filters.tag);

      return matchQuery && matchTime && matchDifficulty && matchCategory && matchRegion && matchTag;
    });
  }, [query, filters]);

  const activeFiltersCount = Object.values(filters).filter(v => v !== '' && v !== 'Halal').length;

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-stone-50">
      <div className="sticky top-0 z-10 bg-stone-50 pt-2 pb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari resep, bahan..." 
              className="pl-12 bg-white shadow-sm border-stone-200 rounded-2xl h-14"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button 
            variant="outline" 
            className="h-14 w-14 rounded-2xl bg-white border-stone-200 shadow-sm relative"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal className="w-5 h-5 text-stone-600" />
            {activeFiltersCount > 0 && (
              <span className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full"></span>
            )}
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.entries(filters) as [keyof typeof filters, string][]).map(([key, value]) => {
            if (value && value !== 'Halal') {
              return (
                <Badge key={key} variant="secondary" className="bg-orange-100 text-orange-800 px-3 py-1 flex items-center gap-1">
                  {value}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterChange(key, value)} />
                </Badge>
              );
            }
            return null;
          })}
          <button 
            onClick={() => setFilters({ time: '', difficulty: '', category: '', region: '', diet: 'Halal', tag: '' })}
            className="text-xs text-stone-500 underline ml-2"
          >
            Hapus semua
          </button>
        </div>
      )}

      <div className="mb-4 text-sm text-stone-500 font-medium">
        Ditemukan {filteredRecipes.length} resep
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-stone-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-2">Belum ketemu.</h3>
          <p className="text-stone-500 text-sm">Coba kata lain atau longgarkan filter pencarianmu.</p>
        </div>
      )}

      {/* Filter Bottom Sheet (Simplified for MVP) */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end bg-stone-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 pb-safe max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-stone-900">Filter Resep</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 bg-stone-100 rounded-full text-stone-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-stone-900 mb-3">Waktu Masak</h3>
                <div className="flex flex-wrap gap-2">
                  {['<15', '15-30', '30-60', '>60'].map(t => (
                    <Badge 
                      key={t} 
                      variant={filters.time === t ? 'default' : 'outline'}
                      className="px-4 py-2 cursor-pointer text-sm"
                      onClick={() => handleFilterChange('time', t)}
                    >
                      {t} mnt
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-3">Tingkat Kesulitan</h3>
                <div className="flex flex-wrap gap-2">
                  {['Mudah', 'Sedang', 'Sulit'].map(d => (
                    <Badge 
                      key={d} 
                      variant={filters.difficulty === d ? 'default' : 'outline'}
                      className="px-4 py-2 cursor-pointer text-sm"
                      onClick={() => handleFilterChange('difficulty', d)}
                    >
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-3">Kategori</h3>
                <div className="flex flex-wrap gap-2">
                  {['Lauk', 'Sayur', 'Sup', 'Sambal', 'Cemilan', 'Utama'].map(c => (
                    <Badge 
                      key={c} 
                      variant={filters.category === c ? 'default' : 'outline'}
                      className="px-4 py-2 cursor-pointer text-sm"
                      onClick={() => handleFilterChange('category', c)}
                    >
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1 h-14 rounded-xl"
                onClick={() => {
                  setFilters({ time: '', difficulty: '', category: '', region: '', diet: 'Halal', tag: '' });
                }}
              >
                Reset
              </Button>
              <Button 
                className="flex-1 h-14 rounded-xl text-base"
                onClick={() => setShowFilters(false)}
              >
                Terapkan Filter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
