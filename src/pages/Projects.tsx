import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '../components/Navbar';
import ProjectSection from '../components/ProjectSection';
import { ChevronLeft, Github, ArrowRight } from 'lucide-react';

// Categorized Projects Data
const projectCategories = [
  {
    title: "E-Commerce",
    description: "Modern, aesthetic, and high-conversion e-commerce solutions providing seamless shopping experiences.",
    alignment: "left" as const,
    projects: [
      {
        id: 8,
        title: 'Papermanbd',
        description: 'Developed a premium e-commerce platform for high-quality notebooks, featuring a modern backend dashboard for inventory management and seamless order processing.',
        image: '/assets/projects/papermanbd.png',
        link: 'https://papermanbd.com',
        github: 'private'
      },
      {
        id: 9,
        title: 'EyegearsBD',
        description: 'Built a sophisticated eyewear e-commerce store specializing in eyeglasses, integrated with a powerful admin dashboard for real-time product and customer management.',
        image: '/assets/projects/eyegearsbd.png',
        link: 'https://eyegearsbd.com',
        github: 'private'
      }
    ]
  },
  {
    title: "Commercial & Agency Projects",
    description: "High-performance websites and platforms designed for businesses, featuring modern aesthetics and conversion-focused functionality.",
    alignment: "right" as const,
    projects: [
      {
        id: 6,
        title: 'Travelexa',
        description: 'Travel agency website with flight hotel booking and outstanding design.',
        image: '/assets/projects/travelexa.png',
        link: 'https://travelexa.vercel.app',
        github: 'https://github.com/ThisIsMahim/travelexa_MVP'
      },
      {
        id: 7,
        title: 'Depotax',
        description: 'Tax consultancy website with lead generation system and modern design.',
        image: '/assets/projects/depotax.png',
        link: 'https://depotax-mvp-seven.vercel.app/',
        github: 'https://github.com/ThisIsMahim/depotax-mvp'
      }
    ]
  },
  {
    title: "SaaS Products",
    description: "Scalable, user-centric software as a service solutions designed to solve real-world problems with AI and modern tech stacks.",
    alignment: "left" as const,
    projects: [
      {
        id: 1,
        title: 'ResumeGuru - AI-Powered Resume Builder',
        description: 'A modern resume builder leveraging AI to transform the career journey. LED development of front-end and back-end integration. Built a secure and user-friendly platform with real-time preview and multiformat export.',
        image: '/assets/projects/resumeguru.webp',
        link: 'https://resume-guru.vercel.app',
        github: 'https://github.com/ThisIsMahim/Resume-guru'
      },
      {
        id: 3,
        title: 'FaceFusion - Advanced Facial Recognition',
        description: 'A sophisticated web app using machine learning for real-time facial recognition and emotion analysis. Integrated TensorFlow.js for real-time face detection and anti-spoofing measures.',
        image: '/assets/projects/facefusion.webp',
        link: 'https://face-recognition-app-opal.vercel.app/',
        github: 'https://github.com/ThisIsMahim/Face-Recognition-App'
      }
    ]
  },
  {
    title: "Social & Custom Platforms",
    description: "Bespoke web applications and social platforms tailored to specific communities, featuring real-time interactions and seamless user experiences.",
    alignment: "right" as const,
    projects: [
      {
        id: 2,
        title: 'UPP Campus - Modern Campus Social Platform',
        description: 'A social platform for university students to connect and share updates. Developed a seamless user experience with responsive design, real-time notifications, and rich user profiles.',
        image: '/assets/projects/uppcampus.webp',
        link: 'https://upp-campus.vercel.app',
        github: 'https://github.com/ThisIsMahim/Upp-campus'
      }
    ]
  },
  {
    title: "Game Development & 3D",
    description: "Immersive interactive experiences and games built with Three.js and modern web technologies, pushing the boundaries of what's possible in a browser.",
    alignment: "left" as const,
    projects: [
      {
        id: 4,
        title: 'Life on Titan - Interactive Educational App',
        description: 'An educational app exploring the potential for life on Titan with engaging visuals. Created interactive 3D models using Three.js and enhanced learning with AI-driven narration.',
        image: '/assets/projects/titan.webp',
        link: 'https://life-on-titan.vercel.app',
        github: 'https://github.com/ThisIsMahim/life-on-titan'
      }
    ]
  }
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Background elements parallax
  const bgY1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const bgY2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="min-h-screen pt-32 relative overflow-hidden bg-[#0a0a0a]" ref={containerRef}>
      <Navbar />

      <div className="pt-10 pb-16 px-6 md:px-12 max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="mb-20 flex flex-row items-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link
            to="/"
            className="mb-6 h-12 w-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors duration-300"
          >
            <ChevronLeft size={24} />
          </Link>
          <div className="flex-1 flex flex-col items-center text-center"> <h1 className="text-5xl md:text-7xl text-gold font-bold tracking-tight mb-4">
            Selected Works
          </h1>
            <p className="text-gray-400 max-w-2xl text-lg">
              A showcase of my journey through SaaS, Full-Stack Development, and Interactive 3D Experiences.
            </p></div>

        </motion.div>

        {/* Categorized Sections */}
        <div className="space-y-12">
          {projectCategories.map((category, index) => (
            <ProjectSection
              key={index}
              title={category.title}
              description={category.description}
              projects={category.projects}
              alignment={category.alignment}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* "And So Much More" Section */}
        <motion.div
          className="mt-32 mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-6">
            Everything else.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            From e-commerce platforms and custom websites to React Native mobile apps and experimental game development. I've built significantly more than what's shown here.
          </p>

          <a
            href="https://github.com/ThisIsMahim"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors duration-300 transform hover:scale-105"
          >
            <Github size={24} />
            <span>Visit My GitHub</span>
            <ArrowRight size={20} />
          </a>
        </motion.div>

      </div>

      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <motion.div
          className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] will-change-[transform]"
          style={{ y: bgY1 }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] will-change-[transform]"
          style={{ y: bgY2 }}
        />
      </div>
    </div>
  );
};

export default Projects;
