import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  InstagramLogo, 
  FacebookLogo, 
  List, 
  X, 
  Star, 
  ArrowRight,
  Cake,
  Cookie,
  Coffee,
  CheckCircle,
  Truck,
  PhoneCall,
  Plus
} from '@phosphor-icons/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants & Types ---

const MENU_ITEMS = [
  {
    id: "bday-cake",
    title: "Signature Celebration Cake",
    description: "Multi-layered sponge with buttercream. Customizable theme.",
    price: 25,
    category: "Cakes",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800",
    tags: ["Popular", "Bespoke"]
  },
  {
    id: "sig-slices",
    title: "Signature Cake Slices",
    description: "A perfect trial of our best-selling daily bakes.",
    price: 3,
    category: "Treats",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800",
    tags: ["Daily Bakes"]
  },
  {
    id: "wedding-cake",
    title: "Bespoke Wedding Masterpiece",
    description: "Multitiered elegance tailored to your reception theme.",
    price: 250,
    category: "Specialty",
    image: "https://images.unsplash.com/photo-1513137330435-88d4076a592c?auto=format&fit=crop&q=80&w=800",
    tags: ["Floral", "Premium"]
  },
  {
    id: "cupcakes",
    title: "Artisan Cupcakes (Set of 6)",
    description: "Honeycomb buttercream on fluffy vanilla sponges.",
    price: 15,
    category: "Treats",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800",
    tags: ["Gifts"]
  },
  {
    id: "cookies",
    title: "Chunky Chocolate Cookies",
    description: "Loaded with fair-trade Belgian chocolate chunks.",
    price: 3,
    category: "Treats",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800",
    tags: ["Daily Bakes"]
  }
];

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

// --- Components ---

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: CartItem[]; 
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-[200]"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-bg z-[201] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-brand-border flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-display">Your Bag</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mt-1">
                  {cart.length === 0 ? "Empty" : `${cart.length} ${cart.length === 1 ? 'Item' : 'Items'}`}
                </p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-brand-surface rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-brand-surface rounded-sm overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold uppercase tracking-tight">{item.title}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-stone-400 hover:text-red-500">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 bg-brand-surface px-2 py-1 border border-brand-border rounded-sm">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="hover:text-brand-accent">-</button>
                        <span className="font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="hover:text-brand-accent">+</button>
                      </div>
                      <span className="font-bold">£{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <div className="py-20 text-center opacity-40 italic font-display text-xl">
                  Your bag is waiting for something sweet...
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-brand-border space-y-6">
                <div className="flex items-center justify-between text-xl font-display">
                  <span>Total Amount</span>
                  <span className="font-sans font-bold">£{total}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-brand-accent text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-ink transition-colors flex items-center justify-center gap-2"
                >
                  Confirm Inquiry <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const OrderModal = ({ 
  isOpen, 
  onClose, 
  initialCakeType = "", 
  cartSummary = "" 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialCakeType?: string;
  cartSummary?: string;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cakeType: initialCakeType,
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ 
        ...prev, 
        cakeType: initialCakeType || (cartSummary ? "Cart Order" : ""),
        message: cartSummary ? `Order Summary:\n${cartSummary}\n\nAdditional details:` : prev.message
      }));
    }
  }, [isOpen, initialCakeType, cartSummary]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: "", email: "", phone: "", cakeType: "", message: "" });
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-brand-bg w-full max-w-lg rounded-sm shadow-2xl p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-brand-ink">
              <X size={24} />
            </button>

            <h3 className="text-3xl font-display mb-2">Finalize Inquiry</h3>
            <p className="text-stone-500 text-sm mb-8 leading-relaxed">
              We'll review your details and contact you within 24 hours to confirm everything.
            </p>
            
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} weight="fill" />
                </div>
                <h4 className="text-xl font-display mb-2">Message Sent!</h4>
                <p className="text-stone-500">We'll get back to you shortly to finalize your order.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">Your Name</label>
                    <input 
                      required
                      className="w-full bg-brand-surface border border-brand-border p-3 focus:outline-none focus:border-brand-accent transition-colors"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      className="w-full bg-brand-surface border border-brand-border p-3 focus:outline-none focus:border-brand-accent transition-colors"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Email Address</label>
                  <input 
                    required
                    type="email"
                    className="w-full bg-brand-surface border border-brand-border p-3 focus:outline-none focus:border-brand-accent transition-colors"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                {cartSummary && (
                   <div className="p-3 bg-brand-surface border border-brand-border rounded-sm text-xs font-mono opacity-60 max-h-32 overflow-y-auto">
                     {cartSummary}
                   </div>
                )}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Order Category</label>
                  <select 
                    className="w-full bg-brand-surface border border-brand-border p-3 focus:outline-none focus:border-brand-accent transition-colors appearance-none"
                    value={formData.cakeType}
                    onChange={e => setFormData({ ...formData, cakeType: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    <option value="Cart Order">Cart Order</option>
                    <option value="Birthday Cake">Birthday Cake</option>
                    <option value="Wedding Cake">Wedding Cake</option>
                    <option value="Slices/Cupcakes">Slices or Cupcakes</option>
                    <option value="Custom Event">Custom Event</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Notes / Preferences</label>
                  <textarea 
                    rows={cartSummary ? 2 : 4}
                    placeholder="Tell us about flavors, dates, or specific themes..."
                    className="w-full bg-brand-surface border border-brand-border p-3 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                
                {status === 'error' && <p className="text-xs text-red-500">Failed to send inquiry. Please try again.</p>}

                <button 
                  disabled={status === 'loading'}
                  className="w-full bg-brand-accent text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-ink transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}

            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[-1] noise-bg" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ 
  onOpenOrder, 
  onOpenCart, 
  cartCount 
}: { 
  onOpenOrder: (type?: string) => void;
  onOpenCart: () => void;
  cartCount: number;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 inset-x-0 z-[100] transition-all duration-500 py-6",
        isScrolled 
          ? "bg-brand-surface/80 backdrop-blur-md border-b border-brand-border py-4 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <a href="#" className="font-display text-2xl md:text-3xl tracking-tight text-brand-ink">
          Rainbow Cake
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Menu", href: "#menu" },
            { label: "Custom Cakes", href: "#custom-cakes" },
            { label: "About", href: "#about" },
            { label: "Visit", href: "#visit" }
          ].map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-sm font-medium text-stone-600 hover:text-brand-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-brand-ink hover:text-brand-accent transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => onOpenOrder()}
              className="bg-brand-accent text-white px-6 py-2.5 rounded-sm text-sm font-medium shadow-sm hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={onOpenCart} className="relative p-2 text-brand-ink">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="text-brand-ink"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full inset-x-0 bg-brand-surface border-b border-brand-border p-6 flex flex-col gap-6 md:hidden"
          >
            {[
              { label: "Menu", href: "#menu" },
              { label: "Custom Cakes", href: "#custom-cakes" },
              { label: "About", href: "#about" },
              { label: "Visit", href: "#visit" }
            ].map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-lg font-medium text-brand-ink"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => {
                onOpenOrder();
                setIsMobileMenuOpen(false);
              }}
              className="bg-brand-accent text-white w-full py-4 rounded-sm font-medium text-center"
            >
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenOrder }: { onOpenOrder: (type?: string) => void }) => {
  return (
    <section className="min-h-[100dvh] pt-32 pb-16 px-6 md:px-10 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Content */}
        <motion.div 
          className="lg:col-span-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] tracking-tight mb-8">
            Life Tastes Better <br />
            <span className="text-brand-accent italic">in Color.</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-[500px]">
            Artisan bakes from Crewe. We create joyful, bespoke cakes and daily treats that turn every moment into a celebration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onOpenOrder()}
              className="bg-brand-accent text-white px-8 py-4 rounded-sm flex items-center justify-center gap-2 group hover:-translate-y-1 transition-all"
            >
              Order Your Cake
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#menu"
              className="border border-brand-accent text-brand-accent px-8 py-4 rounded-sm flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all"
            >
              See Our Menu
            </a>
          </div>
        </motion.div>

        {/* Right Images */}
        <div className="lg:col-span-6 relative h-[500px] md:h-[600px]">
          <motion.div 
            className="absolute top-0 right-0 w-3/4 h-3/4 rounded-sm overflow-hidden shadow-2xl z-10"
            initial={{ opacity: 0, y: 50, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 0.3, duration: 1 }}
            whileHover={{ scale: 1.02, rotate: 0 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800" 
              alt="Artisan Chocolate Cake"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-sm overflow-hidden shadow-xl z-20 border-8 border-brand-surface"
            initial={{ opacity: 0, y: 100, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800" 
              alt="Delicate Cupcakes"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Accent decoration */}
          <div className="absolute top-1/2 right-1/2 w-40 h-40 bg-brand-accent/5 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const items = [
    "Custom Cakes", "Wedding Cakes", "Birthday Cakes", 
    "Cupcakes", "Cookies", "Baptism Cakes", "Daily Bakes"
  ];
  
  return (
    <div className="bg-brand-ink py-8 overflow-hidden border-y border-brand-border/10">
      <div className="flex whitespace-nowrap animate-scroll">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {items.map((item, idx) => (
              <span 
                key={idx} 
                className="text-brand-surface font-display text-3xl md:text-4xl italic lowercase"
              >
                {item} <span className="mx-6 opacity-30 text-white leading-none">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
const About = ({ onOpenOrder }: { onOpenOrder: (type?: string) => void }) => {
  return (
    <section id="about" className="py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] rounded-sm overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
                alt="Baker at work"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 bg-brand-accent text-white p-8 rounded-sm shadow-xl hidden md:block">
              <div className="text-5xl font-display mb-1">4.8</div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} weight="fill" size={16} />
                ))}
              </div>
              <div className="text-xs uppercase tracking-widest font-bold">21 Google Reviews</div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-display leading-tight mb-8">
              Crafting sweet moments <br /> in the heart of Crewe.
            </h2>
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
              <p>
                Founded on the belief that every celebration deserves a centerpiece that shines, Rainbow Cake has spent years perfecting the art of the joyful bake.
              </p>
              <p>
                From the crisp flutter of wedding tiers to the simple comfort of a morning cookie, our kitchen is a place of warmth, flour, and genuine artisanal care. We don't just bake cakes; we bake memories.
              </p>
            </div>
            <button 
              onClick={() => onOpenOrder()}
              className="mt-10 inline-flex items-center gap-2 font-bold tracking-tight uppercase text-sm border-b-2 border-brand-accent pb-1 hover:text-brand-accent transition-colors"
            >
              Inquire Now <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ item, onOrder, onAddToCart }: any) => {
  return (
    <motion.div 
      className={cn(
        "group relative bg-brand-surface border border-brand-border p-6 rounded-sm overflow-hidden hover:border-brand-accent/50 transition-colors duration-500",
        item.className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="aspect-[16/10] mb-6 overflow-hidden rounded-sm">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="flex items-center gap-2 mb-4">
        {item.tags?.map((tag: string) => (
          <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-2xl font-display mb-2">{item.title}</h3>
      <p className="text-sm text-stone-500 mb-6 line-clamp-2">{item.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-lg font-medium">from £{item.price}</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onAddToCart(item)}
            className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-brand-ink transition-colors"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const MenuGrid = ({ onOpenOrder, onAddToCart }: { onOpenOrder: (type?: string) => void, onAddToCart: (item: any) => void }) => {
  return (
    <section id="menu" className="py-24 px-6 md:px-10 bg-brand-surface/40">
      <div className="max-w-[1400px] mx-auto text-left mb-16">
        <h2 className="text-4xl md:text-6xl font-display mb-4 tracking-tight">Our Signature Creations</h2>
        <p className="text-stone-500 max-w-xl text-lg">Every piece is hand-crafted and baked daily using only the finest local ingredients.</p>
      </div>
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MENU_ITEMS.map((item, i) => (
          <ProductCard key={item.id} item={item} onOrder={onOpenOrder} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

const CustomCakesGallery = ({ onOpenOrder }: { onOpenOrder: (type?: string) => void }) => {
  /**
   * NOTE TO USER: To use your own images, please upload them to the project root 
   * (e.g. as cake1.png) and update the URLs below.
   */
  const galleryImages = [
    { 
      url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800", 
      alt: "Bespoke Celebration Cakes with Edible Art" 
    },
    { 
      url: "https://images.unsplash.com/photo-1562233237-10d556aee0c3?auto=format&fit=crop&q=80&w=800", 
      alt: "Elegant Floral Dedications for Special Birthdays" 
    },
    { 
      url: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&q=80&w=800", 
      alt: "Handcrafted Toppers and Delicate Detail" 
    },
    { 
      url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800", 
      alt: "Themed Masterpieces for Memorable Moments" 
    },
  ];

  return (
    <section id="custom-cakes" className="py-24 px-6 md:px-10 overflow-hidden bg-brand-surface">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-16 border-b border-brand-border pb-8">
          <h2 className="text-4xl md:text-6xl font-display tracking-tight">Our Cake Gallery</h2>
          <p className="text-brand-accent font-medium tracking-widest uppercase text-xs">A peek into our kitchen</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryImages.map((img, i) => (
            <motion.div 
              key={i}
              className="aspect-[3/4] group relative overflow-hidden rounded-sm bg-brand-accent-light shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-ink/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
                <div className="w-12 h-[1px] bg-brand-accent mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                <p className="text-white font-display text-xl leading-relaxed">{img.alt}</p>
                <div className="w-12 h-[1px] bg-brand-accent mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="inline-block relative">
            <p className="text-stone-400 italic font-display text-3xl md:text-4xl px-12">
              "Every cake tells a unique story. What's yours?"
            </p>
            <div className="absolute top-0 left-0 text-brand-accent/20 text-8xl font-display -translate-y-6 -translate-x-4">“</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OrderProcess = ({ onOpenOrder }: { onOpenOrder: (type?: string) => void }) => {
  const steps = [
    {
      title: "Choose Your Cake",
      desc: "Browse our menu or dream up a custom creation.",
      icon: <Cake size={40} />
    },
    {
      title: "Get in Touch",
      desc: "Fill our inquiry form or message on Instagram to discuss details.",
      icon: <PhoneCall size={40} />
    },
    {
      title: "Enjoy the Sparkle",
      desc: "Pick up from our Crewe shop or get local delivery.",
      icon: <CheckCircle size={40} />
    }
  ];

  return (
    <section className="py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-display">How to get your slice</h2>
          <button 
            onClick={() => onOpenOrder()}
            className="group flex items-center gap-2 text-brand-accent font-bold uppercase tracking-widest text-sm border-b-2 border-brand-accent/20 hover:border-brand-accent pb-1 transition-all"
          >
            Start Your Order <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[1px] bg-brand-accent/20 -z-10" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              className="group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-brand-accent-light rounded-full flex items-center justify-center text-brand-accent mb-8 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-2xl font-display mb-4">0{i+1}. {step.title}</h3>
              <p className="text-stone-500 max-w-[250px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Sarah J.", text: "The Dubai cake was absolutely stunning. Not just a cake, but a work of art! Best bakery in Crewe.", initials: "SJ" },
    { name: "Mark T.", text: "Perfect wedding cake. They captured our vision perfectly and the tasting session was wonderful.", initials: "MT" },
    { name: "Elena R.", text: "Rainbow Cake is my go-to for every birthday. The cupcakes are dangerously good.", initials: "ER" },
    { name: "James L.", text: "Authentic artisan feel. You can taste the quality ingredients. 10/10 recommended.", initials: "JL" },
  ];

  return (
    <section className="py-24 bg-brand-ink text-brand-surface overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16">
        <h2 className="text-4xl md:text-6xl font-display">What our guests say</h2>
      </div>

      <div className="flex gap-8 px-6 animate-scroll whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-8">
            {reviews.map((r, idx) => (
              <div 
                key={idx} 
                className="inline-block w-[350px] whitespace-normal bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-sm"
              >
                <div className="flex gap-1 mb-4 text-brand-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} weight="fill" size={16} />)}
                </div>
                <p className="text-lg italic opacity-80 mb-6 font-display">"{r.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-xs font-bold">{r.initials}</div>
                  <span className="font-medium">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="visit" className="py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <h2 className="text-4xl md:text-6xl font-display mb-12">Visit Our Shop</h2>
          
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="text-brand-accent"><MapPin size={32} /></div>
              <div>
                <h4 className="text-xl font-display mb-2">Location</h4>
                <p className="text-stone-500">90 Nantwich Road, Crewe<br />CW2 6AT, United Kingdom</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="text-brand-accent"><Phone size={32} /></div>
              <div>
                <h4 className="text-xl font-display mb-2">Call Us</h4>
                <p className="text-stone-500">+44 7882 119183</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-brand-accent"><Coffee size={32} /></div>
              <div>
                <h4 className="text-xl font-display mb-2">Opening Hours</h4>
                <table className="w-full text-sm text-stone-500 mt-2">
                  <tbody>
                    <tr className="border-b border-brand-border">
                      <td className="py-2">Mon - Sat</td>
                      <td className="py-2 text-right">12:00 – 20:00</td>
                    </tr>
                    <tr>
                      <td className="py-2">Sunday</td>
                      <td className="py-2 text-right">15:00 – 20:00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-border">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-4">Available on</p>
              <div className="bg-emerald-500 text-white inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold mb-6">
                Deliveroo
              </div>
              <div>
                <a 
                  href="https://www.google.com/maps/dir//90+Nantwich+Rd,+Crewe+CW2+6AT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-ink text-white px-8 py-4 rounded-sm hover:bg-brand-accent transition-all"
                >
                  <MapPin weight="fill" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 h-[500px] rounded-sm overflow-hidden shadow-xl grayscale-[0.5] hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2402.668725841459!2d-2.4385150232497643!3d53.08985169389278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a5ced8736365f%3A0xe54d3d3a088e7b95!2s90%20Nantwich%20Rd%2C%20Crewe%20CW2%206AT!5e0!3m2!1sen!2suk!4v1715760000000!5m2!1sen!2suk" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
          />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-ink text-brand-surface py-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="md:col-span-2">
          <h3 className="text-4xl font-display mb-6 tracking-tight">Rainbow Cake</h3>
          <p className="text-lg opacity-60 italic font-display max-w-sm">"Baked with Love, Made to Shine"</p>
        </div>
        
        <div>
          <h5 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-40">Navigate</h5>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#menu" className="hover:text-brand-accent transition-colors">Menu</a></li>
            <li><a href="#custom-cakes" className="hover:text-brand-accent transition-colors">Custom Cakes</a></li>
            <li><a href="#about" className="hover:text-brand-accent transition-colors">About Us</a></li>
            <li><a href="#visit" className="hover:text-brand-accent transition-colors">Visit</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-40">Connect</h5>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-accent transition-colors"><InstagramLogo size={24} /></a>
            <a href="#" className="hover:text-brand-accent transition-colors"><FacebookLogo size={24} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4 text-xs opacity-40 tracking-widest uppercase font-bold">
        <p>© 2026 Rainbow Cake Crewe</p>
        <p>Built with love in Crewe</p>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCakeType, setSelectedCakeType] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const openOrder = (type: string = "") => {
    setSelectedCakeType(type);
    setIsOrderModalOpen(true);
  };

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartSummary = cart
    .map(item => `${item.title} x${item.quantity} (£${item.price * item.quantity})`)
    .join("\n");

  return (
    <div className="noise-bg selection:bg-brand-accent selection:text-white">
      <Navbar 
        onOpenOrder={openOrder} 
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />
      <Hero onOpenOrder={openOrder} />
      <Marquee />
      <About onOpenOrder={openOrder} />
      <MenuGrid onOpenOrder={openOrder} onAddToCart={addToCart} />
      <CustomCakesGallery onOpenOrder={openOrder} />
      <OrderProcess onOpenOrder={openOrder} />
      <Testimonials />
      <Contact />
      <Footer />
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsOrderModalOpen(true);
        }}
      />

      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        initialCakeType={selectedCakeType}
        cartSummary={cartSummary}
      />
    </div>
  );
}
