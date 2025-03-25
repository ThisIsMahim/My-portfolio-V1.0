import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import MouseTrail from '../components/MouseTrail';
import { ChevronLeft } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';

// Projects data
const projectsData = [
  {
    id: 1,
    title: 'ResumeGuru - AI-Powered Resume Builder',
    description: 'A modern resume builder leveraging AI to transform the career journey. Led development of front-end and back-end integration. Built a secure and user-friendly platform with real-time preview and multiformat export.',
    image: '/assets/projects/resumeguru.png',
    link: 'https://resume-guru.vercel.app',
    github: 'https://github.com/ThisIsMahim/Resume-guru'
  },
  {
    id: 2,
    title: 'UPP Campus - Modern Campus Social Platform',
    description: 'A social platform for university students to connect and share updates. Developed a seamless user experience with responsive design. Created a feature-rich platform with real-time notifications and user profiles.',
    image: '/assets/projects/uppcampus.png',
    link: 'https://upp-campus.vercel.app',
    github: 'https://github.com/ThisIsMahim/Upp-campus'
  },
  {
    id: 3,
    title: 'FaceFusion - Advanced Facial Recognition',
    description: 'A sophisticated web app using machine learning for real-time facial recognition and emotion analysis. Integrated TensorFlow.js for real-time face detection and emotion analysis. Engineered secure biometric authentication with anti-spoofing measures.',
    image: '/assets/projects/facefusion.png',
    link: 'https://face-recognition-app-opal.vercel.app/',
    github: 'https://github.com/ThisIsMahim/Face-Recognition-App'
  },
  {
    id: 4,
    title: 'Life on Titan - Interactive Educational App',
    description: 'An educational app exploring the potential for life on Titan, with engaging visuals and AI-generated content. Created interactive 3D models using Three.js. Enhanced learning experience with AI-driven narration and simulations.',
    image: '/assets/projects/titan.png',
    link: 'https://life-on-titan.vercel.app',
    github: 'https://github.com/ThisIsMahim/life-on-titan'
  }
];

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Simulate loading of resources
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimate(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <AnimatedBackground>
        <div className="h-screen w-full flex items-center justify-center">
          <div className="text-gold text-2xl animate-pulse">Loading Projects...</div>
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
            <h1 className="text-gold text-3xl font-medium">Projects</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <div 
                key={project.id}
                className="opacity-0"
                style={{
                  animation: 'fade-in 0.5s forwards',
                  animationDelay: `${0.1 + index * 0.1}s`,
                }}
              >
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                  github={project.github}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Projects;
