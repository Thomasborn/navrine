import React from 'react';
import { CheckCircle2, ShieldCheck, X, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';

export function Paywall() {
  const navigate = useNavigate();
  const { unlockLifetime, isLifetimeUnlocked } = useAppStore();

  const handlePurchase = () => {
    unlockLifetime();
    navigate(-1);
  };

  const handleRestore = () => {
    unlockLifetime();
    navigate(-1);
  };

  if (isLifetimeUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-stone-50">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Akses Terbuka</h2>
        <p className="text-stone-500 mb-8 max-w-xs">
          Kamu sudah memiliki akses Lifetime ke semua fitur Masaka.
        </p>
        <Button onClick={() => navigate('/')} className="h-12 px-8 rounded-xl font-bold">
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-stone-950 text-white z-50 flex flex-col max-w-md mx-auto">
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src="https://picsum.photos/seed/masaka-paywall/800/600" 
          alt="Masaka Premium" 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-safe-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors mt-4"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-6 pb-6 flex flex-col -mt-20 relative z-10">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Star className="w-6 h-6 fill-orange-500 text-orange-500" />
          <h1 className="text-3xl font-bold text-center">Masaka Lifetime</h1>
        </div>
        
        <p className="text-stone-400 text-center mb-10 leading-relaxed max-w-xs mx-auto">
          Masak Nusantara jadi gampang. Buka semua fitur premium selamanya, tanpa langganan.
        </p>

        <div className="space-y-5 mb-auto">
          {[
            'Akses ke semua resep premium',
            'Mode Masak fokus tanpa gangguan',
            'Daftar belanja otomatis',
            'Update resep baru gratis selamanya'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="bg-orange-500/20 p-1 rounded-full shrink-0">
                <CheckCircle2 className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-stone-200 font-medium leading-snug">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="bg-stone-900 border border-orange-500/30 rounded-3xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Paling Hemat
            </div>
            <div className="text-stone-400 text-sm font-medium mb-1">Sekali Bayar</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-white">Rp 99.000</span>
              <span className="text-stone-500 line-through text-sm">Rp 299.000</span>
            </div>
            <div className="text-orange-400 text-sm font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Akses selamanya
            </div>
          </div>

          <Button 
            className="w-full h-16 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold shadow-lg shadow-orange-500/20 mb-4"
            onClick={handlePurchase}
          >
            Beli Sekali, Akses Selamanya
          </Button>

          <div className="flex justify-center">
            <button 
              onClick={handleRestore}
              className="text-stone-500 text-sm font-medium hover:text-white transition-colors underline underline-offset-4"
            >
              Sudah pernah beli? Pulihkan Pembelian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
