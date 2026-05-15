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
  PhoneCall
} from '@phosphor-icons/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
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
          {["Menu", "Custom Cakes", "About", "Visit"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className="text-sm font-medium text-stone-600 hover:text-brand-accent transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-brand-accent text-white px-6 py-2.5 rounded-sm text-sm font-medium shadow-sm hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-300">
            Order Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-ink"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <List size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full inset-x-0 bg-brand-surface border-b border-brand-border p-6 flex flex-col gap-6 md:hidden"
          >
            {["Menu", "Custom Cakes", "About", "Visit"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-lg font-medium text-brand-ink"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-brand-accent text-white w-full py-4 rounded-sm font-medium">
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
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
            <button className="bg-brand-accent text-white px-8 py-4 rounded-sm flex items-center justify-center gap-2 group hover:-translate-y-1 transition-all">
              Order Your Cake
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-brand-accent text-brand-accent px-8 py-4 rounded-sm hover:bg-brand-accent hover:text-white transition-all">
              See Our Menu
            </button>
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

const About = () => {
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
            <button className="mt-10 inline-flex items-center gap-2 font-bold tracking-tight uppercase text-sm border-b-2 border-brand-accent pb-1 hover:text-brand-accent transition-colors">
              Our Story <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ title, description, price, image, className }: any) => {
  return (
    <motion.div 
      className={cn(
        "group relative bg-brand-surface border border-brand-border p-6 rounded-sm overflow-hidden hover:border-brand-accent/50 transition-colors duration-500",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="aspect-[16/10] mb-6 overflow-hidden rounded-sm">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <h3 className="text-2xl font-display mb-2">{title}</h3>
      <p className="text-sm text-stone-500 mb-6 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-lg font-medium">from £{price}</span>
        <button className="p-2 rounded-full border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transition-all">
          <ShoppingBag size={20} />
        </button>
      </div>
    </motion.div>
  );
};

const MenuGrid = () => {
  const products = [
    {
      title: "Signature Birthday Cakes",
      description: "Baked with love and personalized for your special day. Available in a variety of flavors and themes.",
      price: "25",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
      className: "lg:col-span-7"
    },
    {
      title: "Signature Slices",
      description: "Perfectly portioned slices of our daily bakes. Try our Rummy Chocolate or seasonal favorites.",
      price: "3",
      image: "https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/686336922_122128964427047824_4974757762857934377_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHz5xa5ykS59B67fMEDPiFPZdsOBM0cJp5l2w4EzRwmnj5-f8hlcOERDj1uUsp6o4uw6_V_9i8BA1NVJ2Za0qXK&_nc_ohc=ra9jHjUVqIMQ7kNvwHjBts5&_nc_oc=AdqTN9EUFaZRPWCYA5p1Mw4aCrePY94R0VIaxEHqr-PH560X51k34JMTM5RdNPx-Nd4&_nc_zt=23&_nc_ht=scontent.fceb1-1.fna&_nc_gid=M96DfZ0GlbCpf8tNdTDwrw&_nc_ss=7b2a8&oh=00_Af4kzpThw1rZ_mpZhde4tP0-HW9J3nO0lk5kwwLpuYSkHA&oe=6A0CD01E",
      className: "lg:col-span-5"
    },
    {
      title: "Custom Wedding Cakes",
      description: "Elegant, multi-tiered creations tailored to your unique love story and floral inspirations.",
      price: "250",
      image: "https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/635138963_122121958413047824_7655843915748301878_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFwItnDY6GJvERa-hRP1Ki7NGtnVUby6I80a2dVRvLoj528AD5nL2Ju_BW5yXwQRz1eu0SlVBAztFMFGKrjprKn&_nc_ohc=oVwzgqp-6MEQ7kNvwHqeQrt&_nc_oc=AdpzK9mFnMS_zgGtJl32iCJ_jhVgBASQfTFpTkUcwgiQgPtGWtxQA-uxJWj-p0sleP4&_nc_zt=23&_nc_ht=scontent.fceb1-1.fna&_nc_gid=v-G04TvZVx3biFqF3Sj6xA&_nc_ss=7b2a8&oh=00_Af6wuXgjEYBQFmXkaSvgtwIRuU07aI9m-3SS7Z6FD2onNw&oe=6A0CEF3A",
      className: "lg:col-span-5"
    },
    {
      title: "Artisan Cupcakes",
      description: "Fluffy bakes topped with our signature honeycomb buttercream and daily inspirations.",
      price: "3",
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800",
      className: "lg:col-span-7"
    }
  ];

  return (
    <section id="menu" className="py-24 px-6 md:px-10 bg-brand-surface/40">
      <div className="max-w-[1400px] mx-auto text-left mb-16">
        <h2 className="text-4xl md:text-6xl font-display mb-4">Our Signature Creations</h2>
        <p className="text-stone-500 max-w-xl">Every piece is hand-crafted and baked daily using only the finest local ingredients.</p>
      </div>
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
};

const OrderProcess = () => {
  const steps = [
    {
      title: "Choose Your Cake",
      desc: "Browse our menu or dream up a custom creation.",
      icon: <Cake size={40} />
    },
    {
      title: "Get in Touch",
      desc: "Call us or message on Instagram to discuss details.",
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
        <h2 className="text-4xl md:text-6xl font-display mb-16">How to get your slice</h2>
        
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
              <div className="bg-emerald-500 text-white inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold">
                Deliveroo
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
  return (
    <div className="noise-bg selection:bg-brand-accent selection:text-white">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <MenuGrid />
      <OrderProcess />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
