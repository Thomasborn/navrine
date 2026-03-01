import React, { useState, useMemo } from 'react';
import { ShoppingBag, Check, Trash2, Copy, Plus } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

export function ShoppingList() {
  const { shoppingList, toggleShoppingItem, clearCheckedShoppingItems } = useAppStore();
  const [showToast, setShowToast] = useState(false);

  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof shoppingList> = {
      Sayur: [],
      Protein: [],
      Bumbu: [],
      Lainnya: []
    };
    
    shoppingList.forEach(item => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      } else {
        groups.Lainnya.push(item);
      }
    });
    
    return groups;
  }, [shoppingList]);

  const handleCopy = () => {
    let textToCopy = '*Belanja Masaka:*\n\n';
    
    (Object.entries(groupedItems) as [string, typeof shoppingList][]).forEach(([category, items]) => {
      if (items.length > 0) {
        textToCopy += `_${category}_\n`;
        items.forEach(item => {
          const checkedMark = item.checked ? '[x]' : '[ ]';
          textToCopy += `${checkedMark} ${item.name} - ${+(item.qty).toFixed(1)} ${item.unit}\n`;
        });
        textToCopy += '\n';
      }
    });

    navigator.clipboard.writeText(textToCopy);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const hasCheckedItems = shoppingList.some(i => i.checked);
  const isEmpty = shoppingList.length === 0;

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-stone-50 relative">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 mb-1 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-green-600 fill-green-100" />
            Daftar Belanja
          </h1>
          <p className="text-stone-500 text-sm">Bahan dari resep pilihanmu.</p>
        </div>
        {hasCheckedItems && (
          <button 
            onClick={clearCheckedShoppingItems}
            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
            title="Hapus yang selesai"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </header>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-green-300" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">Belanjaan kosong</h2>
          <p className="text-stone-500 text-sm mb-8 max-w-[250px]">
            Tambahkan bahan dari resep yang ingin kamu masak.
          </p>
        </div>
      ) : (
        <div className="space-y-6 mb-20">
          {(Object.entries(groupedItems) as [string, typeof shoppingList][]).map(([category, items]) => {
            if (items.length === 0) return null;
            return (
              <div key={category} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
                <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {category}
                </h3>
                <ul className="space-y-3">
                  {items.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => toggleShoppingItem(item.id)}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
                        item.checked 
                          ? "bg-green-500 border-green-500 text-white" 
                          : "border-stone-300 text-transparent group-hover:border-green-400"
                      )}>
                        <Check className="w-4 h-4" strokeWidth={3} />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className={cn(
                          "text-sm font-medium transition-all",
                          item.checked ? "text-stone-400 line-through" : "text-stone-800"
                        )}>
                          {item.name}
                        </span>
                        <span className={cn(
                          "text-sm font-semibold transition-all",
                          item.checked ? "text-stone-400" : "text-stone-900"
                        )}>
                          {+(item.qty).toFixed(1)} {item.unit}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {!isEmpty && (
        <div className="fixed bottom-20 left-0 right-0 px-4 max-w-md mx-auto z-40">
          <Button 
            className="w-full h-14 rounded-2xl shadow-lg bg-green-600 hover:bg-green-700 text-base font-bold"
            onClick={handleCopy}
          >
            <Copy className="w-5 h-5 mr-2" />
            Salin untuk WhatsApp
          </Button>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-36 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50 animate-in fade-in slide-in-from-bottom-4">
          Disalin ke clipboard ✅
        </div>
      )}
    </div>
  );
}
