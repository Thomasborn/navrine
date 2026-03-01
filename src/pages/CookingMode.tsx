import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Clock, X, List, Play, Pause, RotateCcw } from 'lucide-react';
import { recipes } from '../data/recipes';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

export function CookingMode() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const servings = Number(searchParams.get('servings')) || 1;
  
  const recipe = recipes.find(r => r.id === id);
  const servingsRatio = recipe ? servings / recipe.servingsDefault : 1;

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showIngredients, setShowIngredients] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (recipe && recipe.steps[currentStep].timerSuggestedSec) {
      setTimeLeft(recipe.steps[currentStep].timerSuggestedSec!);
      setIsTimerRunning(false);
    } else {
      setTimeLeft(0);
      setIsTimerRunning(false);
    }
  }, [currentStep, recipe]);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Optional: Play sound or vibrate
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  if (!recipe) return null;

  const handleNext = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finish cooking
      navigate(-1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleStepComplete = () => {
    setCompletedSteps(prev => 
      prev.includes(currentStep) 
        ? prev.filter(s => s !== currentStep)
        : [...prev, currentStep]
    );
    if (!completedSteps.includes(currentStep) && currentStep < recipe.steps.length - 1) {
      setTimeout(handleNext, 300); // Auto advance after short delay
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setTimer = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setIsTimerRunning(false);
  };

  const isCompleted = completedSteps.includes(currentStep);
  const progressPercentage = ((currentStep + 1) / recipe.steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-stone-950 text-white z-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-stone-800">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-stone-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <div className="text-center">
          <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">
            Langkah {currentStep + 1} dari {recipe.steps.length}
          </div>
          <div className="font-bold text-sm truncate max-w-[200px]">{recipe.title}</div>
        </div>
        <button onClick={() => setShowIngredients(true)} className="p-2 -mr-2 text-stone-400 hover:text-white">
          <List className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-stone-800">
        <div 
          className="h-full bg-orange-500 transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center relative">
        <div className="text-center space-y-8">
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold leading-tight transition-opacity duration-300",
            isCompleted ? "text-stone-500 line-through" : "text-white"
          )}>
            {recipe.steps[currentStep].text}
          </h2>

          {/* Timer Module */}
          <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 max-w-xs mx-auto">
            <div className="text-5xl font-mono font-light tracking-tighter mb-6 text-orange-500">
              {formatTime(timeLeft)}
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
              <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                {isTimerRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
              <button 
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimeLeft(recipe.steps[currentStep].timerSuggestedSec || 0);
                }}
                className="w-14 h-14 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center hover:bg-stone-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {[1, 3, 5, 10].map(m => (
                <button
                  key={m}
                  onClick={() => setTimer(m)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs font-medium hover:bg-stone-700"
                >
                  +{m}m
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-6 bg-stone-950 border-t border-stone-800 pb-safe">
        <button 
          onClick={toggleStepComplete}
          className={cn(
            "w-full h-16 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold transition-colors mb-6",
            isCompleted 
              ? "bg-stone-800 text-stone-400" 
              : "bg-green-600 text-white hover:bg-green-500"
          )}
        >
          {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
          {isCompleted ? "Selesai" : "Tandai Selesai"}
        </button>

        <div className="flex justify-between gap-4">
          <Button 
            variant="outline" 
            className="flex-1 h-14 border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Sebelumnya
          </Button>
          <Button 
            className="flex-1 h-14 bg-stone-800 text-white hover:bg-stone-700"
            onClick={handleNext}
          >
            {currentStep === recipe.steps.length - 1 ? 'Selesai Masak' : 'Berikutnya'}
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </div>

      {/* Ingredients Bottom Sheet */}
      {showIngredients && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm">
          <div className="bg-stone-900 w-full rounded-t-3xl p-6 pb-safe max-h-[70vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Bahan-bahan</h3>
              <button onClick={() => setShowIngredients(false)} className="p-2 bg-stone-800 rounded-full text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 pr-2">
              <ul className="space-y-4">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b border-stone-800 pb-3 last:border-0">
                    <span className="text-stone-300">{ing.name}</span>
                    <span className="font-semibold text-white">
                      {+(ing.qty * servingsRatio).toFixed(1)} {ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
