import React from 'react';
import { Clock, Flame, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recipe } from '../data/recipes';
import { Badge } from './ui/Badge';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="block group">
      <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-stone-100 transition-all hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={recipe.heroImageUrl}
            alt={recipe.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {recipe.isPremium && (
            <div className="absolute top-2 right-2 bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> PRO
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0">
              {recipe.category}
            </Badge>
            <span className="text-xs text-stone-500 font-medium">{recipe.region}</span>
          </div>
          <h3 className="font-semibold text-stone-900 leading-tight mb-3 line-clamp-2">
            {recipe.title}
          </h3>
          <div className="mt-auto flex items-center justify-between text-xs text-stone-500 font-medium">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{recipe.totalTimeMin} mnt</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
