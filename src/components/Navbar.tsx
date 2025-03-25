import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, ArrowRight, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-30 py-6 px-6 md:px-12 transition-all duration-300 ${
        scrolled ? 'bg-black/30 backdrop-blur-lg border-b border-gold/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent'
      } `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        {/* Logo */}

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-gold hover:opacity-80 transition-opacity"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <ChevronDown 
            size={24} 
            className={`transform transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <Link to="/" className="flex flex-col items-center group">
          <div className="text-2xl font-bold text-gold mb-1 transform group-hover:scale-110 transition-transform">
            <img src="/assets/logo-transparent.webp" alt="Logo" className="w-20 h-20" />
          </div>
          <div className="text-gold -mt-4 text-lg font-medium tracking-wider group-hover:opacity-80 transition-opacity">
            Mahim Masrafi
          </div>
        </Link>

        

        {/* Center Navigation - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/about" 
            className={`hover-gold text-base font-medium tracking-wide ${location.pathname === '/about' ? 'text-gold' : 'text-white'}`}
          >
            About
          </Link>
          <span className="text-gold">|</span>
          <Link 
            to="/contact" 
            className={`hover-gold text-base font-medium tracking-wide ${location.pathname === '/contact' ? 'text-gold' : 'text-white'}`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div 
          className={`absolute top-full left-0 w-full bg-black/30 backdrop-blur-lg border-b border-gold/10 md:hidden transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link 
              to="/about" 
              className={`hover-gold text-base font-medium tracking-wide ${location.pathname === '/about' ? 'text-gold' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`hover-gold text-base font-medium tracking-wide ${location.pathname === '/contact' ? 'text-gold' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <a className="flex items-center justify-center w-10 h-10 md:w-36 md:h-10 bg-transparent border border-gold text-gold rounded-full text-base font-medium hover-gold-glow smooth-transition group" href='mailto:mahimmasrafi04@gmail.com?subject=I%20want%20to%20hire%20you'>
            <span className="hidden md:inline mr-2">Hire me</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a className="flex items-center justify-center w-10 h-10 md:w-36 md:h-10 bg-gold text-white rounded-full text-base font-medium hover-gold-glow smooth-transition group" href='/assets/CV-of-mahim-masrafi.pdf' download>
            <span className="hidden md:inline mr-2">Download CV</span>
            <Download size={18} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
