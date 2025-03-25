import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GalleryItem from '../components/GalleryItem';
import MouseTrail from '../components/MouseTrail';
import { ChevronLeft, X } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';

// Mock gallery data - replace with your actual images
const galleryData = [
  {
    id: 1,
    image: '/assets/gallery/gallery7.jpg',
    alt: 'Portrait photography',
    title: 'Portrait Study'
  },
  {
    id: 2,
    image: '/assets/gallery/gallery2.jpg',
    alt: 'Nature photography',
    title: 'Sunflower valley'
  },
  {
    id: 3,
    image: '/assets/gallery/gallery8.jpg',
    alt: 'Street photography',
    title: 'Urban Life'
  },
  {
    id: 4,
    image: '/assets/gallery/gallery4.jpg',
    alt: 'village photography',
    title: 'The great catch'
  },
  {
    id: 5,
    image: '/assets/gallery/gallery3.jpg',
    alt: 'river photography',
    title: 'The boat'
  },
  {
    id: 6,
    image: '/assets/gallery/gallery1.jpg',
    alt: 'Nature photography',
    title: 'The paddy field'
  },
  {
    id: 7,
    image: '/assets/gallery/gallery6.jpg',
    alt: 'Night photography',
    title: 'The Light of knowledge'
  },
  {
    id: 8,
    image: '/assets/gallery/gallery5.jpg',
    alt: 'Star photography',
    title: 'Looking for the stars'
  }
];

interface SelectedImage {
  image: string;
  alt: string;
  title: string;
}

const GalleryModal = ({ image, onClose }: { image: SelectedImage; onClose: () => void }) => {
  return (
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-2xl transform transition-all duration-300 ease-out"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold hover:text-white transition-colors duration-200 z-10"
        >
          <X size={24} />
        </button>
        
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <img
            src={image.image}
            alt={image.alt}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="mt-4">
          <h3 className="text-gold text-2xl font-medium">{image.title}</h3>
          <p className="text-gold text-opacity-80 mt-2">{image.alt}</p>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  useEffect(() => {
    // Simulate loading of resources
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimate(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (item: SelectedImage) => {
    setSelectedImage(item);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <AnimatedBackground>
        <div className="h-screen w-full flex items-center justify-center">
          <div className="text-gold text-2xl animate-pulse">Loading Gallery...</div>
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground>
      <MouseTrail />
      <div className="min-h-screen pt-32">
        <Navbar />

        <div className={`pt-28 pb-16 px-6 md:px-12 max-w-7xl mx-auto ${animate ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="mb-12 flex items-center">
            <Link 
              to="/"
              className="mr-4 h-10 w-10 rounded-full border border-gold border-opacity-40 flex items-center justify-center text-gold hover-gold-glow smooth-transition hoverable"
            >
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-gold text-3xl font-medium">Gallery</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryData.map((item, index) => (
              <div 
                key={item.id}
                className="opacity-0 cursor-pointer"
                style={{
                  animation: 'fade-in 0.5s forwards',
                  animationDelay: `${0.1 + index * 0.1}s`,
                }}
                onClick={() => handleImageClick(item)}
              >
                <GalleryItem 
                  image={item.image}
                  alt={item.alt}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedImage && (
          <GalleryModal 
            image={selectedImage} 
            onClose={handleCloseModal}
          />
        )}
      </div>
    </AnimatedBackground>
  );
};

export default Gallery;
