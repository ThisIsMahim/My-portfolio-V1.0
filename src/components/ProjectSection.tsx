import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    github: string;
}

interface ProjectSectionProps {
    title: string;
    description: string;
    projects: Project[];
    alignment?: 'left' | 'right';
    delay?: number;
}

const ProjectSection = ({ title, description, projects, alignment = 'left', delay = 0 }: ProjectSectionProps) => {
    return (
        <section className="py-20 relative z-10">
            <div className={`flex flex-col ${alignment === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>

                {/* Text Content */}
                <motion.div
                    className="w-full md:w-1/3 space-y-6"
                    initial={{ opacity: 0, x: alignment === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay, ease: "easeOut" }}
                >
                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl text-gold font-bold mb-2 relative z-10">{title}</h2>
                        <div className={`absolute -bottom-2 ${alignment === 'right' ? 'right-0' : 'left-0'} w-20 h-1 bg-gold/30 rounded-full`} />
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                        {description}
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="w-full md:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: delay + 0.2 + (index * 0.1) }}
                            >
                                <ProjectCard {...project} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;
