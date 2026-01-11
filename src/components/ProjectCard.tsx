import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
}

const ProjectCard = ({ title, description, image, link, github }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="relative bg-black bg-opacity-40 backdrop-blur-md rounded-xl overflow-hidden border border-gold/20 group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)`
        }}
      />

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-video cursor-pointer overflow-hidden z-10"
      >
        {!imageLoaded && (
          <Skeleton className="absolute inset-0" />
        )}
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay with View Demo button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="flex items-center gap-2 text-gold font-medium border border-gold/50 px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ExternalLink size={18} />
            <span>View Live Demo</span>
          </div>
        </div>
      </a>

      <div className="p-5 relative z-10 bg-gradient-to-b from-transparent to-black/80">
        <h3 className="text-gold text-lg font-medium mb-1 group-hover:text-white transition-colors duration-300">{title}</h3>
        <p className="text-gold/70 text-xs mb-4 line-clamp-3 group-hover:text-gold/90 transition-colors duration-300">{description}</p>

        <div className="flex justify-between items-center mt-auto">
          {github === 'private' ? (
            <div className="flex items-center gap-2 text-gold/40 cursor-not-allowed">
              <Github size={18} />
              <span className="text-xs">Source Code Private</span>
            </div>
          ) : (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gold/70 hover:text-white transition-colors duration-200"
            >
              <Github size={18} />
              <span className="text-xs">Source Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
