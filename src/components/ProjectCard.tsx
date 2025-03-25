import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
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
    <div 
      className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl overflow-hidden border border-gold border-opacity-20"
      style={{
        transform: 'translateZ(0)', // Hardware acceleration
        willChange: 'transform', // Optimize for animations
      }}
    >
      <div className="relative aspect-video">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0" />
        )}
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-200 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'translateZ(0)' }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-gold text-xl font-medium mb-2">{title}</h3>
        <p className="text-gold text-opacity-80 text-sm mb-4">{description}</p>
        
        <div className="flex gap-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold text-opacity-80 hover:text-opacity-100 transition-colors duration-200 hoverable"
            style={{ transform: 'translateZ(0)' }}
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold text-opacity-80 hover:text-opacity-100 transition-colors duration-200 hoverable"
            style={{ transform: 'translateZ(0)' }}
          >
            <ExternalLink size={20} />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
