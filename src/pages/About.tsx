import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

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

interface Entrepreneurship {
  role: string;
  company: string;
  description: string;
  date: string;
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
    duration: 'Expected Graduation: 2027',
    gpa: 'GPA: 3.51/4.0'
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Rajuk Uttara Model College',
    duration: 'Completed',
    gpa: 'GPA: 5.0/5.0'
  }
];

const entrepreneurship: Entrepreneurship[] = [
  {
    role: 'Co-founder and CEO',
    company: 'Skybridge Digital',
    description: 'A web development and digital marketing agency.',
    date: 'October 2025'
  },
  {
    role: 'Co-founder',
    company: 'Wrist Orbit',
    description: 'An online wristwatch shop.',
    date: 'March 2025'
  },
  {
    role: 'Co-founder',
    company: 'Flan BD',
    description: 'Co-founded and managing an innovative online gift shop, bringing unique and personalized gifting experiences to customers.',
    date: 'October 2024'
  }
];

interface WorkExperience {
  role: string;
  company: string;
  duration: string;
}

const workExperience: WorkExperience[] = [
  {
    role: 'Front End Developer',
    company: 'Softenginelab',
    duration: 'April 2024 - December 2025'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const About = () => {
  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div
          className="mb-12 flex items-center"
          variants={itemVariants}
        >
          <Link
            to="/"
            className="mr-4 h-10 w-10 rounded-full border border-gold border-opacity-40 flex items-center justify-center text-gold hover-gold-glow smooth-transition hoverable"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-gold text-3xl font-medium">About</h1>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-8">About Me</h1>
          <p className="text-white text-lg md:text-xl leading-relaxed">
            A passionate <span className="text-gold">Full Stack Developer</span> and <span className="text-gold">Digital Marketer</span> with expertise in building scalable web applications and driving business growth. I specialize in creating high-performance, user-centric solutions that bridge the gap between technology and marketing. By leveraging modern web technologies and strategic digital marketing, I help businesses scale their online presence and achieve measurable results.
          </p>
        </motion.div>

        {/* Work Experience Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gold mb-8">Work Experience</h2>
          <div className="space-y-6">
            {workExperience.map((job, index) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="border-l-2 border-gold pl-6 py-3 hover:pl-8 transition-all duration-300"
              >
                <h3 className="text-white text-xl font-bold mt-1 hover:text-gold transition-colors">
                  {job.role}
                </h3>
                <p className="text-gray-400 mt-2">{job.company}</p>
                <p className="text-gold mt-1 text-sm">{job.duration}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gold mb-8">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="border-l-2 border-gold pl-6 py-3 hover:pl-8 transition-all duration-300"
              >
                <h3 className="text-white text-xl font-bold mt-1 hover:text-gold transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-gray-400 mt-2">{edu.institution}</p>
                <p className="text-gray-400">{edu.duration}</p>
                <p className="text-gold mt-1">{edu.gpa}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* Entrepreneurship Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gold mb-8">Entrepreneurship</h2>
          <div className="space-y-6">
            {entrepreneurship.map((item, index) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="border-l-2 border-gold pl-6 py-3 hover:pl-8 transition-all duration-300"
              >
                <h3 className="text-white text-xl font-bold mt-1 hover:text-gold transition-colors">
                  {item.role} - {item.company}
                </h3>
                <p className="text-gray-400 mt-2">{item.description}</p>
                <p className="text-gold mt-1 text-sm">{item.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gold mb-8">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="relative p-4 border border-gold/20 rounded-lg hover:border-gold/50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white">{skill.name}</span>
                  <span className="text-gold">{skill.percentage}%</span>
                </div>
                <div className="mt-2 h-1 bg-gold/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gold"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default About; 