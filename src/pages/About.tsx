import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MouseTrail from '@/components/MouseTrail';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import CircularProgress from '@/components/CircularProgress';

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

          {/* Education Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gold mb-8">Education</h2>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.2,
                      },
                    },
                  }}
                  className="group relative border-l-2 border-gold pl-8 py-4 hover:scale-[1.02] transition-transform"
                >
                  <div className="absolute -left-2.5 top-5 h-5 w-5 rounded-full bg-gold" />
                  <h3 className="text-white text-xl font-bold mt-1 group-hover:text-gold transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-400 mt-2">{edu.institution}</p>
                  <p className="text-gray-400">{edu.duration}</p>
                  <p className="text-gold mt-1">{edu.gpa}</p>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold/0 group-hover:bg-gold/50 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Entrepreneurship Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gold mb-8">Entrepreneurship</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
              className="group relative border-l-2 border-gold pl-8 py-4 hover:scale-[1.02] transition-transform"
            >
              <div className="absolute -left-2.5 top-5 h-5 w-5 rounded-full bg-gold" />
              <h3 className="text-white text-xl font-bold mt-1 group-hover:text-gold transition-colors">
                Co-founder - Flan BD
              </h3>
              <p className="text-gray-400 mt-2">
                Co-founded and managing an innovative online gift shop, bringing unique and personalized gifting experiences to customers.
              </p>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold/0 group-hover:bg-gold/50 transition-all duration-300" />
            </motion.div>
          </div>

          
          {/* Skills Section */}
          <div className="mb-16" ref={ref}>
            <h2 className="text-3xl font-bold text-gold mb-8">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial="hidden"
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                      },
                    },
                  }}
                  className="flex justify-center"
                >
                  <CircularProgress skill={skill.name} percentage={skill.percentage} />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AnimatedBackground>
  );
};

export default About; 