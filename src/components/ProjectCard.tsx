import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import Skeleton from './Skeleton';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

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
      className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl overflow-hidden border border-gold border-opacity-20 transition-transform duration-300 hover:scale-[1.025] hover:shadow-2xl hover:shadow-gold/10"
      style={{
        transform: 'translateZ(0)', // Hardware acceleration
        willChange: 'transform', // Optimize for animations
      }}
    >
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <a href={link} target="_blank" rel="noopener noreferrer" className="block relative aspect-video cursor-pointer group">
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
            {/* Optional: subtle overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200 pointer-events-none" />
          </a>
        </HoverCardTrigger>
        <HoverCardContent
          align="center"
          side="top"
          sideOffset={-120}
          className="w-64 bg-black/90 border border-gold/20 backdrop-blur-sm flex flex-col items-center justify-center text-center z-50"
        >
          <div className="flex flex-col items-center justify-center">
            <ExternalLink className="h-5 w-5 text-gold mb-2" />
            <h4 className="text-gold text-sm font-medium">Click to view live demo</h4>
          </div>
        </HoverCardContent>
      </HoverCard>
      
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
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
