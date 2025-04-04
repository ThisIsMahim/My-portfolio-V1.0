import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MouseTrail from '@/components/MouseTrail';
import { AnimatedBackground } from '@/components/AnimatedBackground';

interface Skill {
  name: string;
  percentage: number;
}

interface Education {
  degree: string;
  institution: string;
  duration: string;
  gpa: string;
}

const skills: Skill[] = [
  { name: 'React/Next.js', percentage: 90 },
  { name: 'TypeScript', percentage: 85 },
  { name: 'JavaScript', percentage: 95 },
  { name: 'Node.js', percentage: 75 },
  { name: 'Three.js', percentage: 80 },
  { name: 'Tailwind CSS', percentage: 90 },
  { name: 'HTML/CSS', percentage: 100 },
  { name: 'Git/GitHub', percentage: 90 },
  { name: 'Responsive Design', percentage: 100 },
  { name: 'Problem Solving', percentage: 95 },
];

const education: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science & Engineering (CSE)',
    institution: 'Mymensingh Engineering College, Mymensingh, Bangladesh',
    duration: 'Expected Graduation: 2026',
    gpa: 'GPA: 3.51/4.0'
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Rajuk Uttara Model College',
    duration: 'Completed',
    gpa: 'GPA: 5.0/5.0'
  }
];

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <AnimatedBackground>
      <MouseTrail />
      <div className="min-h-screen">
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32">
          <div className="mb-12 flex items-center">
            <Link 
              to="/"
              className="mr-4 h-10 w-10 rounded-full border border-gold border-opacity-40 flex items-center justify-center text-gold hover-gold-glow smooth-transition hoverable"
            >
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-gold text-3xl font-medium">About</h1>
          </div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gold mb-8">About Me</h1>
            <p className="text-white text-lg md:text-xl leading-relaxed">
              A passionate <span className="text-gold">Front End Developer</span> and <span className="text-gold">Entrepreneur</span> with expertise in modern web technologies and people management.
              Specializing in creating elegant, efficient, and user-centric applications
              that solve real-world problems. With a strong foundation in frontend
              and moderate skills in backend development, I bring ideas to life through clean code and
              innovative solutions.
            </p>
          </motion.div>

          {/* Education Section - Optimized */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gold mb-8">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="border-l-2 border-gold pl-6 py-3 hover:pl-8 transition-all duration-300"
                >
                  <h3 className="text-white text-xl font-bold mt-1 hover:text-gold transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-400 mt-2">{edu.institution}</p>
                  <p className="text-gray-400">{edu.duration}</p>
                  <p className="text-gold mt-1">{edu.gpa}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Entrepreneurship Section - Optimized */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gold mb-8">Entrepreneurship</h2>
            <div
              className="border-l-2 border-gold pl-6 py-3 hover:pl-8 transition-all duration-300"
            >
              <h3 className="text-white text-xl font-bold mt-1 hover:text-gold transition-colors">
                Co-founder - Flan BD
              </h3>
              <p className="text-gray-400 mt-2">
                Co-founded and managing an innovative online gift shop, bringing unique and personalized gifting experiences to customers.
              </p>
            </div>
          </div>

          {/* Skills Section - Minimal & Efficient */}
          <div className="mb-16" ref={ref}>
            <h2 className="text-3xl font-bold text-gold mb-8">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="relative p-4 border border-gold/20 rounded-lg hover:border-gold/50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-gold">{skill.percentage}%</span>
                  </div>
                  <div className="mt-2 h-1 bg-gold/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold transition-all duration-1000"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AnimatedBackground>
  );
};

export default About; 