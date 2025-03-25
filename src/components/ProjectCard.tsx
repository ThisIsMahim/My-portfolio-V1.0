import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  link,
  github
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-darkGray rounded-xl overflow-hidden hover-gold-glow group smooth-transition hoverable flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Project image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover smooth-transition"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-darkGray/80"
        />
      </div>
      
      {/* Content section */}
      <div className="relative flex-1 p-6 bg-darkGray">
        {/* Title */}
        <h3 className="text-gold text-xl font-medium mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/80 text-sm mb-6 line-clamp-3">
          {description}
        </p>
        
        {/* Action buttons */}
        <div className="flex gap-3 mt-auto">
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-gold text-sm border border-gold/40 rounded-full py-1.5 px-4 hover:bg-gold/10 hover:border-gold smooth-transition hoverable"
            >
              <Github size={14} className="mr-2" />
              <span>GitHub</span>
            </a>
          )}
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-gold text-sm border border-gold/40 rounded-full py-1.5 px-4 hover:bg-gold/10 hover:border-gold smooth-transition hoverable"
            >
              <span>Live Demo</span>
              <ExternalLink size={14} className="ml-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
