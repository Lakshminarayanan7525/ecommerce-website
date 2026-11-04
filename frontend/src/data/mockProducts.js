export const initialCategories = [
  { id: 'electronics', name: 'Electronics', icon: 'Laptop', count: 18, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', count: 24, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80' },
  { id: 'home-kitchen', name: 'Home & Kitchen', icon: 'Home', count: 15, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80' },
  { id: 'shoes', name: 'Shoes', icon: 'Footprints', count: 14, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80' },
];

export const fallbackProducts = [
  {
    _id: 'prod-boat-450',
    name: 'boAt Rockerz 450 Wireless Headphones',
    description: 'Immersive 40mm audio drivers delivering crisp highs and punchy bass. Lightweight ergonomic design with plush padded ear cups and up to 15 hours playback.',
    originalPrice: 2999,
    discountPrice: 1499,
    categoryName: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 25,
    rating: 4.4,
    reviewsCount: 8230,
    features: [
      'Powerful 40mm Dynamic Bass Drivers',
      'Up to 15 Hours Non-Stop Playback',
      'Bluetooth 5.0 Instant Pairing',
      'Adaptive Earcups & Ultra Lightweight Fit'
    ]
  },
  {
    _id: 'prod-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Epic AI-powered flagship smartphone featuring a 200MP Quad Telephoto camera, titanium frame, built-in S Pen, and Qualcomm Snapdragon 8 Gen 3 for Galaxy.',
    originalPrice: 119999,
    discountPrice: 89999,
    categoryName: 'Electronics',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 12,
    rating: 4.6,
    reviewsCount: 12400,
    features: [
      '200MP Camera with ProVisual AI Engine',
      'Corning Gorilla Armor Anti-Reflective Display',
      'Built-in S-Pen with low latency',
      '5000 mAh All-day Battery'
    ]
  },
  {
    _id: 'prod-nike-rev7',
    name: 'Nike Revolution 7 Running Shoes',
    description: 'Soft foam midsole delivers smooth, plush ride with every stride. Breathable knit upper keeps your feet cool on long runs and casual walks.',
    originalPrice: 5999,
    discountPrice: 3999,
    categoryName: 'Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 30,
    rating: 4.5,
    reviewsCount: 6200,
    features: [
      'Engineered Mesh for targeted breathability',
      'Generative traction pattern on rubber outsole',
      'Soft touchpoints at heel and tongue',
      'Responsive cushioned midsole'
    ]
  },
  {
    _id: 'prod-noise-pro5',
    name: 'Noise ColorFit Pro 5 Smartwatch',
    description: 'Vibrant 1.85-inch AMOLED display with always-on function. Post-training analytics, SOS technology, Bluetooth calling, and 100+ sports modes.',
    originalPrice: 4999,
    discountPrice: 2999,
    categoryName: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 45,
    rating: 4.3,
    reviewsCount: 7150,
    features: [
      '1.85" AMOLED Display with 60Hz Refresh Rate',
      'Single-chip Bluetooth Calling with TruSync',
      '24/7 Heart Rate & SpO2 Monitoring',
      'IP68 Water & Dust Resistant'
    ]
  },
  {
    _id: 'prod-hp-victus',
    name: 'HP Victus 15 Gaming Laptop',
    description: 'Powered by 12th Gen Intel Core i5 processor and NVIDIA GeForce RTX 3050 graphics. 144Hz FHD anti-glare display for ultra smooth gaming visuals.',
    originalPrice: 78990,
    discountPrice: 64990,
    categoryName: 'Electronics',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 8,
    rating: 4.5,
    reviewsCount: 5120,
    features: [
      'Intel Core i5-12450H 12-Core Processor',
      'NVIDIA GeForce RTX 3050 (4GB GDDR6)',
      '15.6" 144Hz FHD Micro-edge Display',
      '512GB PCIe NVMe SSD & 16GB DDR4 RAM'
    ]
  },
  {
    _id: 'prod-skybags-pack',
    name: 'Skybags Backpack',
    description: 'Ergonomically designed durable multi-compartment travel and laptop backpack with water-resistant polyester fabric and rain cover.',
    originalPrice: 2999,
    discountPrice: 1999,
    categoryName: 'Fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 22,
    rating: 4.4,
    reviewsCount: 9340,
    features: [
      'Padded 15.6 inch laptop sleeve',
      'Air-mesh breathable back padding',
      '3 Spacious full compartments & organizer',
      'Tear-resistant water repellent fabric'
    ]
  },
  {
    _id: 'prod-smart-tv',
    name: 'Smart 4K Ultra HD TV 55"',
    description: 'Cinematic visual experience with Dolby Vision HDR, MEMC motion smoothing, and powerful 30W stereo speakers.',
    originalPrice: 55000,
    discountPrice: 42999,
    categoryName: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    stock: 14,
    rating: 4.6,
    reviewsCount: 3890,
    features: [
      '4K Quantum Dot Display with HDR10+',
      'Built-in Google TV with Voice Assistant',
      'Dolby Atmos Surround Audio',
      'Ultra Slim Bezel Metal Body'
    ]
  },
  {
    _id: 'prod-coffee-maker',
    name: 'Automatic Espresso Coffee Machine',
    description: '15-bar Italian pump pressure creates rich golden crema. Dual temperature control for steaming milk foam and brewing espresso simultaneously.',
    originalPrice: 25000,
    discountPrice: 18999,
    categoryName: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    stock: 10,
    rating: 4.9,
    reviewsCount: 1420,
    features: [
      'High-Pressure 15-Bar Italian Extraction Pump',
      'Stainless Steel Swivel Steam Frothing Wand',
      'Removable 1.5L Transparent Water Reservoir',
      'One-touch Single & Double Shot Buttons'
    ]
  }
];

