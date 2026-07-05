export const restaurant = {
  name: 'رستوران هوتی گریل',
  branch: 'شعبه ولیعصر',
  logoText: 'ه',
  rating: 4.7,
  ratingCount: 812,
  deliveryNote: 'سفارش مستقیم از میز شما',
}

export const categories = [
  { id: 'starter', label: 'پیش‌غذا' },
  { id: 'main', label: 'غذای اصلی' },
  { id: 'drink', label: 'نوشیدنی' },
  { id: 'dessert', label: 'دسر' },
]

export const menuItems = [
  {
    id: 'i1',
    category: 'starter',
    name: 'سالاد شیرازی',
    desc: 'خیار، گوجه و پیاز خردشده با لیمو و نعنای تازه',
    price: 85000,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=60',
    tags: ['گیاهی', 'سبک'],
    spicy: 0,
    popular: false,
  },
  {
    id: 'i2',
    category: 'starter',
    name: 'ماست و موسیر',
    desc: 'ماست چکیده خانگی با موسیر تازه',
    price: 65000,
    image:
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=800&q=60',
    tags: ['گیاهی', 'سبک'],
    spicy: 0,
    popular: false,
  },
  {
    id: 'i3',
    category: 'main',
    name: 'جوجه کباب زعفرانی',
    desc: 'سینه مرغ مزه‌دار شده با زعفران، همراه برنج ایرانی',
    price: 320000,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60',
    tags: ['پرفروش', 'بدون گلوتن'],
    spicy: 0,
    popular: true,
  },
  {
    id: 'i4',
    category: 'main',
    name: 'کباب کوبیده ویژه',
    desc: 'گوشت گوسفند و گوساله چرخ‌شده، کباب‌شده روی زغال',
    price: 350000,
    image:
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=60',
    tags: ['پرفروش'],
    spicy: 1,
    popular: true,
  },
  {
    id: 'i5',
    category: 'main',
    name: 'قرمه‌سبزی',
    desc: 'خورش سنتی سبزی معطر با لوبیا قرمز و گوشت گوساله',
    price: 285000,
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=60',
    tags: ['تند ملایم', 'سنتی'],
    spicy: 1,
    popular: false,
  },
  {
    id: 'i6',
    category: 'main',
    name: 'فسنجان با مرغ',
    desc: 'خورش گردو و رب انار با مرغ، ملایم و مغزدار',
    price: 295000,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=60',
    tags: ['سنتی'],
    spicy: 0,
    popular: false,
  },
  {
    id: 'i7',
    category: 'main',
    name: 'چلو ماهی قزل‌آلا',
    desc: 'ماهی قزل‌آلای سرخ‌شده با ادویه‌های مخصوص و برنج زعفرانی',
    price: 310000,
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=60',
    tags: ['بدون گلوتن', 'سبک'],
    spicy: 0,
    popular: false,
  },
  {
    id: 'i8',
    category: 'drink',
    name: 'دوغ سنتی با نعنا',
    desc: 'دوغ خانگی گازدار با نعنای خشک',
    price: 45000,
    image:
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=60',
    tags: ['گیاهی'],
    spicy: 0,
    popular: false,
  },
  {
    id: 'i9',
    category: 'drink',
    name: 'آبمیوه طبیعی انار',
    desc: 'آب انار تازه بدون شکر افزوده',
    price: 68000,
    image:
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=60',
    tags: ['گیاهی', 'پرفروش'],
    spicy: 0,
    popular: true,
  },
  {
    id: 'i10',
    category: 'drink',
    name: 'چای سنتی با هل',
    desc: 'دم‌نوش چای ایرانی معطر با هل',
    price: 35000,
    image:
      'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=60',
    tags: ['گرم'],
    spicy: 0,
    popular: false,
  },
  {
    id: 'i11',
    category: 'dessert',
    name: 'بستنی سنتی زعفرانی',
    desc: 'بستنی دستی با زعفران، خامه و تکه‌های پسته',
    price: 78000,
    image:
      'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=60',
    tags: ['پرفروش', 'سرد'],
    spicy: 0,
    popular: true,
  },
  {
    id: 'i12',
    category: 'dessert',
    name: 'شله‌زرد',
    desc: 'دسر سنتی برنج و زعفران با دارچین و پسته',
    price: 60000,
    image:
      'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&w=800&q=60',
    tags: ['سنتی', 'گیاهی'],
    spicy: 0,
    popular: false,
  },
]

export const findItem = (id) => menuItems.find((m) => m.id === id)
