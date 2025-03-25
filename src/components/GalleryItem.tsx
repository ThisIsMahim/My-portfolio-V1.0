import { useState } from 'react';
import Skeleton from './Skeleton';

interface GalleryItemProps {
  image: string;
  alt: string;
  title: string;
}

const GalleryItem = ({ image, alt, title }: GalleryItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="relative group overflow-hidden rounded-lg aspect-square"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {!imageLoaded && (
        <Skeleton className="absolute inset-0" />
      )}
      <img
        src={image}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translateZ(0)' }}
        onLoad={() => setImageLoaded(true)}
      />
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-200 group-hover:bg-opacity-50"
        style={{ 
          transform: 'translateZ(0)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ transform: 'translateZ(0)' }}
        >
          <h3 className="text-gold text-lg font-medium text-center px-4">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
