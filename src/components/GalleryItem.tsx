
import { useState } from 'react';

interface GalleryItemProps {
  image: string;
  alt: string;
  title?: string;
  aspectRatio?: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  image,
  alt,
  title,
  aspectRatio = 'aspect-square'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl hover-gold-glow group hoverable ${aspectRatio}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={image} 
        alt={alt} 
        className="w-full h-full object-cover smooth-transition"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black smooth-transition flex items-end p-4"
        style={{
          opacity: isHovered ? 0.7 : 0,
        }}
      >
        {title && (
          <div 
            className="text-gold text-sm font-medium transform smooth-transition"
            style={{
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
              opacity: isHovered ? 1 : 0,
            }}
          >
            {title}
          </div>
        )}
      </div>
      
      {/* Border overlay for hover effect */}
      <div 
        className="absolute inset-0 border-2 border-gold rounded-xl smooth-transition"
        style={{
          opacity: isHovered ? 0.6 : 0,
        }}
      ></div>
    </div>
  );
};

export default GalleryItem;
