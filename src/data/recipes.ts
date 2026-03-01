export type Difficulty = 'Mudah' | 'Sedang' | 'Sulit';
export type Category = 'Lauk' | 'Sayur' | 'Sup' | 'Sambal' | 'Cemilan' | 'Minuman' | 'Utama';
export type Region = 'Sumatera' | 'Jawa' | 'Bali-Nusra' | 'Kalimantan' | 'Sulawesi' | 'Papua/Maluku' | 'Nasional';

export interface Ingredient {
  id: string;
  name: string;
  qty: number;
  unit: string;
  notes?: string;
  optionalSubstitute?: string;
  category: 'Sayur' | 'Protein' | 'Bumbu' | 'Lainnya';
}

export interface Step {
  text: string;
  timerSuggestedSec?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  region: Region;
  category: Category;
  difficulty: Difficulty;
  totalTimeMin: number;
  servingsDefault: number;
  tags: string[];
  heroImageUrl: string;
  ingredients: Ingredient[];
  steps: Step[];
  tips: string[];
  isPremium: boolean;
}

export const recipes: Recipe[] = [
  {
    id: 'rendang-padang',
    title: 'Rendang Daging Padang',
    description: 'Olahan daging sapi dengan bumbu rempah pekat dan santan yang dimasak perlahan hingga empuk dan meresap sempurna.',
    region: 'Sumatera',
    category: 'Lauk',
    difficulty: 'Sulit',
    totalTimeMin: 180,
    servingsDefault: 5,
    tags: ['Pedas', 'Daging', 'Santan', 'Tahan Lama'],
    heroImageUrl: 'https://picsum.photos/seed/rendang/800/600',
    isPremium: false,
    ingredients: [
      { id: 'i1', name: 'Daging Sapi (potong dadu)', qty: 500, unit: 'g', category: 'Protein' },
      { id: 'i2', name: 'Santan Kental', qty: 500, unit: 'ml', category: 'Lainnya' },
      { id: 'i3', name: 'Santan Encer', qty: 500, unit: 'ml', category: 'Lainnya' },
      { id: 'i4', name: 'Daun Jeruk', qty: 4, unit: 'lembar', category: 'Bumbu' },
      { id: 'i5', name: 'Serai (memarkan)', qty: 2, unit: 'batang', category: 'Bumbu' },
      { id: 'i6', name: 'Bumbu Halus (Bawang, Cabai, Jahe, Lengkuas, Kunyit)', qty: 150, unit: 'g', category: 'Bumbu' }
    ],
    steps: [
      { text: 'Rebus santan encer bersama bumbu halus, daun jeruk, dan serai sambil terus diaduk agar santan tidak pecah.' },
      { text: 'Masukkan potongan daging sapi, masak dengan api sedang hingga daging berubah warna dan santan menyusut.' },
      { text: 'Tuangkan santan kental, kecilkan api. Masak perlahan sambil sesekali diaduk.', timerSuggestedSec: 3600 },
      { text: 'Terus masak hingga bumbu mengering, mengeluarkan minyak, dan berwarna cokelat gelap (sekitar 2-3 jam).' }
    ],
    tips: [
      'Gunakan daging bagian paha (gandik) agar tidak mudah hancur saat dimasak lama.',
      'Aduk perlahan dan konstan saat santan kental masuk agar bumbu meresap rata dan tidak gosong di bawah.'
    ]
  },
  {
    id: 'soto-ayam-lamongan',
    title: 'Soto Ayam Lamongan',
    description: 'Soto ayam kuah kuning segar dengan taburan koya kerupuk udang yang gurih khas Jawa Timur.',
    region: 'Jawa',
    category: 'Sup',
    difficulty: 'Sedang',
    totalTimeMin: 60,
    servingsDefault: 4,
    tags: ['Ayam', 'Kuah', 'Segar', 'Anak Kos'],
    heroImageUrl: 'https://picsum.photos/seed/soto/800/600',
    isPremium: true,
    ingredients: [
      { id: 'i7', name: 'Ayam Kampung (potong 4)', qty: 500, unit: 'g', category: 'Protein' },
      { id: 'i8', name: 'Air', qty: 1.5, unit: 'L', category: 'Lainnya' },
      { id: 'i9', name: 'Serai (memarkan)', qty: 2, unit: 'batang', category: 'Bumbu' },
      { id: 'i10', name: 'Daun Jeruk', qty: 5, unit: 'lembar', category: 'Bumbu' },
      { id: 'i11', name: 'Bumbu Halus (Bawang, Kunyit, Kemiri, Jahe)', qty: 100, unit: 'g', category: 'Bumbu' },
      { id: 'i12', name: 'Kol (iris halus)', qty: 100, unit: 'g', category: 'Sayur' },
      { id: 'i13', name: 'Soun (seduh air panas)', qty: 50, unit: 'g', category: 'Lainnya' },
      { id: 'i14', name: 'Bubuk Koya', qty: 4, unit: 'sdm', category: 'Bumbu' }
    ],
    steps: [
      { text: 'Rebus ayam bersama air hingga empuk. Angkat ayam, suwir-suwir dagingnya. Sisihkan kaldu.', timerSuggestedSec: 2400 },
      { text: 'Tumis bumbu halus, serai, dan daun jeruk hingga harum dan matang.' },
      { text: 'Masukkan tumisan bumbu ke dalam air kaldu rebusan ayam. Didihkan kembali, tambahkan garam dan kaldu bubuk.' },
      { text: 'Tata soun, kol, dan ayam suwir di mangkuk. Siram dengan kuah soto panas.' },
      { text: 'Taburi dengan bubuk koya, seledri, dan bawang goreng. Sajikan dengan jeruk nipis dan sambal.' }
    ],
    tips: [
      'Koya bisa dibuat sendiri dengan menghaluskan kerupuk udang goreng dan bawang putih goreng.',
      'Gunakan ayam kampung untuk kaldu yang lebih gurih dan bening.'
    ]
  },
  {
    id: 'nasi-goreng-kampung',
    title: 'Nasi Goreng Kampung',
    description: 'Nasi goreng sederhana dengan bumbu terasi dan kecap manis, andalan saat lapar melanda.',
    region: 'Nasional',
    category: 'Utama',
    difficulty: 'Mudah',
    totalTimeMin: 15,
    servingsDefault: 2,
    tags: ['Cepat', 'Hemat', 'Anak Kos', 'Pedas'],
    heroImageUrl: 'https://picsum.photos/seed/nasgor/800/600',
    isPremium: false,
    ingredients: [
      { id: 'i15', name: 'Nasi Putih Dingin', qty: 400, unit: 'g', category: 'Lainnya' },
      { id: 'i16', name: 'Telur Ayam', qty: 2, unit: 'butir', category: 'Protein' },
      { id: 'i17', name: 'Bawang Merah (iris)', qty: 5, unit: 'siung', category: 'Bumbu' },
      { id: 'i18', name: 'Bawang Putih (cincang)', qty: 3, unit: 'siung', category: 'Bumbu' },
      { id: 'i19', name: 'Cabai Rawit (iris)', qty: 5, unit: 'buah', category: 'Bumbu' },
      { id: 'i20', name: 'Terasi Bakar', qty: 1, unit: 'sdt', category: 'Bumbu' },
      { id: 'i21', name: 'Kecap Manis', qty: 2, unit: 'sdm', category: 'Bumbu' }
    ],
    steps: [
      { text: 'Panaskan sedikit minyak, buat telur orak-arik hingga matang. Sisihkan di pinggir wajan.' },
      { text: 'Tumis bawang merah, bawang putih, dan cabai rawit hingga harum.' },
      { text: 'Masukkan terasi bakar, aduk rata dengan bumbu tumis.' },
      { text: 'Masukkan nasi putih dingin, aduk cepat dengan api besar hingga bumbu merata.', timerSuggestedSec: 180 },
      { text: 'Tambahkan kecap manis, garam, dan lada. Aduk terus hingga nasi agak kering dan berasap.' }
    ],
    tips: [
      'Gunakan nasi sisa semalam yang sudah didinginkan di kulkas agar nasi goreng tidak lembek.',
      'Gunakan api besar saat memasukkan nasi untuk mendapatkan aroma "wok hei" atau aroma asap wajan.'
    ]
  },
  {
    id: 'ayam-betutu',
    title: 'Ayam Betutu Khas Bali',
    description: 'Ayam utuh yang dimasak perlahan dengan bumbu genep Bali yang kaya rempah dan pedas menggigit.',
    region: 'Bali-Nusra',
    category: 'Lauk',
    difficulty: 'Sedang',
    totalTimeMin: 90,
    servingsDefault: 4,
    tags: ['Ayam', 'Pedas', 'Rempah', 'Tanpa Santan'],
    heroImageUrl: 'https://picsum.photos/seed/betutu/800/600',
    isPremium: true,
    ingredients: [
      { id: 'i22', name: 'Ayam Utuh (belah tengah)', qty: 1, unit: 'ekor', category: 'Protein' },
      { id: 'i23', name: 'Bumbu Genep (Base Genep)', qty: 200, unit: 'g', category: 'Bumbu' },
      { id: 'i24', name: 'Daun Singkong (rebus)', qty: 100, unit: 'g', category: 'Sayur' },
      { id: 'i25', name: 'Serai (memarkan)', qty: 3, unit: 'batang', category: 'Bumbu' },
      { id: 'i26', name: 'Daun Salam', qty: 4, unit: 'lembar', category: 'Bumbu' },
      { id: 'i27', name: 'Air', qty: 500, unit: 'ml', category: 'Lainnya' }
    ],
    steps: [
      { text: 'Lumuri ayam dengan setengah bagian bumbu genep hingga merata ke bagian dalam.' },
      { text: 'Campur sisa bumbu genep dengan daun singkong rebus, lalu masukkan ke dalam rongga perut ayam.' },
      { text: 'Panaskan sedikit minyak, tumis serai dan daun salam. Masukkan ayam, tuang air.' },
      { text: 'Masak dengan api kecil dan panci tertutup hingga ayam empuk dan air menyusut.', timerSuggestedSec: 3600 },
      { text: 'Panggang sebentar di oven atau teflon untuk mengeringkan bagian luarnya (opsional).' }
    ],
    tips: [
      'Base genep Bali terdiri dari bawang, cabai, kencur, jahe, lengkuas, kunyit, kemiri, terasi, ketumbar, dan merica.',
      'Memasak dengan api kecil (slow cook) membuat bumbu meresap sempurna hingga ke tulang.'
    ]
  },
  {
    id: 'sayur-asem',
    title: 'Sayur Asem Sunda',
    description: 'Sayur berkuah asam segar dengan isian jagung, melinjo, dan labu siam. Cocok dinikmati siang hari.',
    region: 'Jawa',
    category: 'Sayur',
    difficulty: 'Mudah',
    totalTimeMin: 30,
    servingsDefault: 4,
    tags: ['Sayur', 'Segar', 'Sehat', 'Cepat'],
    heroImageUrl: 'https://picsum.photos/seed/sayurasem/800/600',
    isPremium: false,
    ingredients: [
      { id: 'i28', name: 'Jagung Manis (potong)', qty: 1, unit: 'buah', category: 'Sayur' },
      { id: 'i29', name: 'Labu Siam (potong dadu)', qty: 1, unit: 'buah', category: 'Sayur' },
      { id: 'i30', name: 'Kacang Panjang (potong)', qty: 5, unit: 'lonjor', category: 'Sayur' },
      { id: 'i31', name: 'Melinjo & Daunnya', qty: 50, unit: 'g', category: 'Sayur' },
      { id: 'i32', name: 'Kacang Tanah', qty: 50, unit: 'g', category: 'Lainnya' },
      { id: 'i33', name: 'Asam Jawa (larutkan air)', qty: 2, unit: 'sdm', category: 'Bumbu' },
      { id: 'i34', name: 'Bumbu Halus (Bawang Merah, Cabai Merah, Terasi, Kemiri)', qty: 50, unit: 'g', category: 'Bumbu' },
      { id: 'i35', name: 'Lengkuas (memarkan)', qty: 1, unit: 'ruas', category: 'Bumbu' }
    ],
    steps: [
      { text: 'Didihkan air dalam panci. Masukkan bumbu halus, lengkuas, dan daun salam. Rebus hingga harum.' },
      { text: 'Masukkan bahan yang keras terlebih dahulu: jagung manis, kacang tanah, dan melinjo. Rebus hingga empuk.', timerSuggestedSec: 600 },
      { text: 'Tambahkan labu siam dan kacang panjang. Masak sebentar.' },
      { text: 'Masukkan air asam jawa, garam, dan sedikit gula merah. Koreksi rasa.' },
      { text: 'Terakhir masukkan daun melinjo, matikan api. Sajikan hangat.' }
    ],
    tips: [
      'Gunakan asam jawa muda yang direbus dan disaring airnya untuk rasa asam yang lebih segar.',
      'Jangan merebus sayuran terlalu lama agar teksturnya tetap renyah dan warnanya cerah.'
    ]
  },
  {
    id: 'ikan-kuah-kuning',
    title: 'Ikan Kuah Kuning',
    description: 'Sajian ikan segar dengan kuah kuning asam pedas khas Indonesia Timur, pendamping setia Papeda.',
    region: 'Papua/Maluku',
    category: 'Lauk',
    difficulty: 'Mudah',
    totalTimeMin: 25,
    servingsDefault: 3,
    tags: ['Ikan', 'Segar', 'Cepat', 'Tanpa Santan'],
    heroImageUrl: 'https://picsum.photos/seed/ikankuning/800/600',
    isPremium: true,
    ingredients: [
      { id: 'i36', name: 'Ikan Tongkol/Tenggiri', qty: 500, unit: 'g', category: 'Protein' },
      { id: 'i37', name: 'Jeruk Nipis', qty: 1, unit: 'buah', category: 'Bumbu' },
      { id: 'i38', name: 'Kemangi', qty: 1, unit: 'ikat', category: 'Sayur' },
      { id: 'i39', name: 'Bumbu Halus (Bawang, Kunyit, Jahe, Kemiri)', qty: 80, unit: 'g', category: 'Bumbu' },
      { id: 'i40', name: 'Serai (memarkan)', qty: 2, unit: 'batang', category: 'Bumbu' },
      { id: 'i41', name: 'Cabai Rawit Utuh', qty: 10, unit: 'buah', category: 'Bumbu' },
      { id: 'i42', name: 'Air', qty: 600, unit: 'ml', category: 'Lainnya' }
    ],
    steps: [
      { text: 'Cuci bersih ikan, lumuri dengan perasan jeruk nipis dan garam. Diamkan 10 menit, bilas.' },
      { text: 'Tumis bumbu halus bersama serai dan daun jeruk hingga harum dan matang.' },
      { text: 'Tuang air, didihkan. Masukkan ikan dan cabai rawit utuh.', timerSuggestedSec: 420 },
      { text: 'Tambahkan garam, gula, dan perasan jeruk nipis/air asam. Masak hingga ikan matang.' },
      { text: 'Sesaat sebelum diangkat, masukkan daun kemangi. Aduk sebentar, angkat.' }
    ],
    tips: [
      'Pilih ikan laut yang segar agar kuah tidak amis.',
      'Kemangi dimasukkan terakhir agar aromanya tetap kuat dan daunnya tidak layu menghitam.'
    ]
  }
];
