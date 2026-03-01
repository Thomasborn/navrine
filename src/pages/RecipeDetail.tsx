import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Flame, Users, Bookmark, ShoppingBag, Share2, ChevronLeft, Play, Info, CheckCircle2 } from 'lucide-react';
import { recipes } from '../data/recipes';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../utils/cn';

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === id);
  
  const { savedRecipeIds, toggleSaveRecipe, addRecipeToShoppingList, isLifetimeUnlocked } = useAppStore();
  
  const [servings, setServings] = useState(recipe?.servingsDefault || 1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-xl font-bold mb-2">Resep tidak ditemukan</h2>
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </div>
    );
  }

  const isSaved = savedRecipeIds.includes(recipe.id);
  const servingsRatio = servings / recipe.servingsDefault;

  const handleSave = () => {
    toggleSaveRecipe(recipe.id);
    showNotification(isSaved ? 'Dihapus dari Simpanan' : 'Disimpan ke Favorit');
  };

  const handleAddToShoppingList = () => {
    if (!isLifetimeUnlocked && recipe.isPremium) {
      navigate('/paywall');
      return;
    }
    addRecipeToShoppingList(recipe.id, recipe.ingredients, servingsRatio);
    showNotification('Masuk ke Belanja ✅');
  };

  const handleStartCooking = () => {
    if (!isLifetimeUnlocked && recipe.isPremium) {
      navigate('/paywall');
      return;
    }
    navigate(`/cook/${recipe.id}?servings=${servings}`);
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="pb-24 bg-white min-h-screen max-w-md mx-auto relative">
      {/* Header Image & Back Button */}
      <div className="relative h-72 w-full bg-stone-200">
        <img 
          src={recipe.heroImageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-safe-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors mt-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2 mb-2">
            <Badge className="bg-orange-500 text-white border-none">{recipe.category}</Badge>
            {recipe.tags.includes('Pedas') && (
              <Badge className="bg-red-500 text-white border-none">Pedas</Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white leading-tight">{recipe.title}</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Quick Info Row */}
        <div className="flex justify-between items-center py-4 border-b border-stone-100 mb-4">
          <div className="flex flex-col items-center gap-1">
            <Clock className="w-5 h-5 text-stone-400" />
            <span className="text-xs font-medium text-stone-600">{recipe.totalTimeMin} mnt</span>
          </div>
          <div className="w-px h-8 bg-stone-200" />
          <div className="flex flex-col items-center gap-1">
            <Users className="w-5 h-5 text-stone-400" />
            <span className="text-xs font-medium text-stone-600">{recipe.servingsDefault} porsi</span>
          </div>
          <div className="w-px h-8 bg-stone-200" />
          <div className="flex flex-col items-center gap-1">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-xs font-medium text-stone-600">{recipe.difficulty}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button 
            className="flex-1 h-12 rounded-xl text-base font-bold shadow-sm"
            onClick={handleStartCooking}
          >
            <Play className="w-5 h-5 mr-2 fill-current" />
            Mulai Mode Masak
          </Button>
        </div>

        <div className="flex gap-4 justify-around mb-8">
          <button onClick={handleSave} className="flex flex-col items-center gap-1.5 text-stone-500 hover:text-orange-500 transition-colors">
            <div className={cn("p-3 rounded-full bg-stone-50", isSaved && "bg-orange-50 text-orange-500")}>
              <Bookmark className={cn("w-5 h-5", isSaved && "fill-current")} />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">Simpan</span>
          </button>
          <button onClick={handleAddToShoppingList} className="flex flex-col items-center gap-1.5 text-stone-500 hover:text-green-600 transition-colors">
            <div className="p-3 rounded-full bg-stone-50">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">Belanja</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 text-stone-500 hover:text-blue-500 transition-colors">
            <div className="p-3 rounded-full bg-stone-50">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">Bagikan</span>
          </button>
        </div>

        {/* Description */}
        <p className="text-stone-600 leading-relaxed mb-8 text-sm">
          {recipe.description}
        </p>

        {/* Ingredients */}
        <section className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-stone-900">Bahan-bahan</h2>
            
            {/* Servings Adjuster */}
            <div className="flex items-center bg-stone-100 rounded-full p-1">
              <button 
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-stone-600 font-medium"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-bold text-stone-900">
                {servings}
              </span>
              <button 
                onClick={() => setServings(Math.min(20, servings + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-stone-600 font-medium"
              >
                +
              </button>
            </div>
          </div>

          <ul className="space-y-3">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0">
                <div className="flex-1">
                  <span className="text-stone-800 font-medium text-sm">{ing.name}</span>
                  {ing.notes && <p className="text-xs text-stone-500 mt-0.5">{ing.notes}</p>}
                </div>
                <div className="text-right font-semibold text-stone-900 text-sm">
                  {+(ing.qty * servingsRatio).toFixed(1)} {ing.unit}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Tips Anti-Gagal */}
        {recipe.tips.length > 0 && (
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-8">
            <h3 className="flex items-center gap-2 font-bold text-orange-800 mb-3 text-sm">
              <Info className="w-4 h-4" />
              Tips Anti-Gagal
            </h3>
            <ul className="space-y-2">
              {recipe.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-orange-900/80">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps Preview */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Langkah-langkah</h2>
          <div className="space-y-4">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 font-bold flex items-center justify-center text-sm shrink-0">
                    {idx + 1}
                  </div>
                  {idx !== recipe.steps.length - 1 && (
                    <div className="w-px h-full bg-stone-100 my-1" />
                  )}
                </div>
                <div className="pb-4 pt-1">
                  <p className="text-stone-700 text-sm leading-relaxed">{step.text}</p>
                  {step.timerSuggestedSec && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 rounded-md text-xs font-medium text-stone-600">
                      <Clock className="w-3.5 h-3.5" />
                      {Math.round(step.timerSuggestedSec / 60)} menit
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50 animate-in fade-in slide-in-from-bottom-4">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
