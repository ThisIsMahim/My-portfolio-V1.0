import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import GalleryItem from '../components/GalleryItem';
import { ChevronLeft, X } from 'lucide-react';

// Mock gallery data - replace with your actual images
const galleryData = [
  {
    id: 1,
    image: '/assets/gallery/gallery7.webp',
    alt: 'Portrait photography',
    title: 'Portrait Study'
  },
  {
    id: 2,
    image: '/assets/gallery/gallery2.webp',
    alt: 'Nature photography',
    title: 'Sunflower valley'
  },
  {
    id: 3,
    image: '/assets/gallery/gallery8.webp',
    alt: 'Street photography',
    title: 'Urban Life'
  },
  {
    id: 4,
    image: '/assets/gallery/gallery4.webp',
    alt: 'village photography',
    title: 'The great catch'
  },
  {
    id: 5,
    image: '/assets/gallery/gallery3.webp',
    alt: 'river photography',
    title: 'The boat'
  },
  {
    id: 6,
    image: '/assets/gallery/gallery1.webp',
    alt: 'Nature photography',
    title: 'The paddy field'
  },
  {
    id: 7,
    image: '/assets/gallery/gallery6.webp',
    alt: 'Night photography',
    title: 'The Light of knowledge'
  },
  {
    id: 8,
    image: '/assets/gallery/gallery5.webp',
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
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative max-w-5xl w-full bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold hover:text-white transition-colors duration-200 z-10"
        >
          <X size={24} />
        </button>

        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          {!modalImageLoaded && (
            <div className="absolute inset-0 bg-gold/10 animate-pulse rounded-lg" />
          )}
          <img
            src={image.image}
            alt={image.alt}
            className={`w-full h-full object-contain transition-opacity duration-300 ${modalImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => setModalImageLoaded(true)}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-gold text-2xl font-medium">{image.title}</h3>
          <p className="text-gold text-opacity-80 mt-2">{image.alt}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4
    }
  }
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  const handleImageClick = (item: SelectedImage) => {
    setSelectedImage(item);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <motion.div
      className="min-h-screen pt-32"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <Navbar />

      <div className="pt-10 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          className="mb-12 flex items-center"
          variants={itemVariants}
        >
          <Link
            to="/"
            className="mr-4 h-10 w-10 rounded-full border border-gold border-opacity-40 flex items-center justify-center text-gold hover-gold-glow smooth-transition hoverable"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-gold text-3xl font-medium">Gallery</h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryData.map((item) => (
            <motion.div
              key={item.id}
              className="cursor-pointer"
              variants={itemVariants}
              onClick={() => handleImageClick(item)}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <GalleryItem
                image={item.image}
                alt={item.alt}
                title={item.title}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <GalleryModal
            image={selectedImage}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gallery;
