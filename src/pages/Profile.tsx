import React from 'react';
import { User, Settings, ShieldCheck, HelpCircle, ChevronRight, Star, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';

export function Profile() {
  const navigate = useNavigate();
  const { isLifetimeUnlocked, preferences, updatePreference } = useAppStore();

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-stone-50">
      <header className="mb-8 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-200">
          <User className="w-8 h-8 text-orange-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 mb-1">Koki Pemula</h1>
          <p className="text-stone-500 text-sm">Masak Nusantara jadi gampang.</p>
        </div>
      </header>

      {/* Lifetime Access Card */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-6 text-white mb-8 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <h2 className="text-lg font-bold">Masaka Lifetime</h2>
          </div>
          <p className="text-stone-300 text-sm mb-6 leading-relaxed">
            {isLifetimeUnlocked 
              ? "Kamu sudah membuka semua fitur premium selamanya. Selamat memasak!" 
              : "Buka semua resep premium, mode masak fokus, dan daftar belanja otomatis."}
          </p>
          
          {!isLifetimeUnlocked ? (
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white border-none rounded-xl font-bold"
                onClick={() => navigate('/paywall')}
              >
                Upgrade Sekarang
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white rounded-xl"
                onClick={() => navigate('/paywall')}
              >
                Pulihkan
              </Button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-bold border border-green-500/30">
              <ShieldCheck className="w-4 h-4" />
              Aktif Selamanya
            </div>
          )}
        </div>
      </div>

      {/* Preferences */}
      <section className="mb-8">
        <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-4 px-2">
          Preferensi Masak
        </h3>
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          
          <div className="flex items-center justify-between p-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-stone-900">Satuan Takaran</div>
                <div className="text-xs text-stone-500">Gram/ml atau Sendok/Gelas</div>
              </div>
            </div>
            <select 
              className="bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={preferences.unit}
              onChange={(e) => updatePreference('unit', e.target.value)}
            >
              <option value="gram/ml">Gram / ml</option>
              <option value="sendok/gelas">Sendok / Gelas</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg text-red-500">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-stone-900">Tingkat Pedas Default</div>
                <div className="text-xs text-stone-500">Sesuaikan selera lidahmu</div>
              </div>
            </div>
            <select 
              className="bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={preferences.spiceLevel}
              onChange={(e) => updatePreference('spiceLevel', e.target.value)}
            >
              <option value="Sedang">Sedang</option>
              <option value="Pedas">Pedas</option>
              <option value="Sangat Pedas">Sangat Pedas</option>
            </select>
          </div>

        </div>
      </section>

      {/* Support */}
      <section>
        <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-4 px-2">
          Bantuan & Info
        </h3>
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          
          <button className="w-full flex items-center justify-between p-4 border-b border-stone-100 hover:bg-stone-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="font-semibold text-stone-900">FAQ & Bantuan</div>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="font-semibold text-stone-900">Kebijakan Privasi</div>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-400" />
          </button>

        </div>
      </section>

      <div className="mt-12 text-center">
        <p className="text-xs text-stone-400 font-medium tracking-widest uppercase">
          Masaka App v1.0.0
        </p>
      </div>
    </div>
  );
}
