// src/components/Projects.tsx
import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string; // Path to project image
  link?: string;
}

const projects: Project[] = [
  {
    title: 'CryptoTracker',
    description: 'Developed a real-time crypto portfolio tracker using React and Node.js.',
    technologies: ['React', 'Node.js', 'Ethereum', 'MongoDB'],
    image: '/images/projects/cryptotracker.png',
    link: 'https://github.com/weihouang/CryptoTracker',
  },
  {
    title: 'BlockExplore',
    description: 'Built a blockchain explorer with FastAPI and PostgreSQL, enabling quick transaction lookups.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
    image: '/images/projects/blockexplore.png',
    link: 'https://github.com/weihouang/BlockExplore',
  },
  {
    title: 'DermAI',
    description: 'Created an ML-powered skin condition detection app with TensorFlow and Flask.',
    technologies: ['Swift', 'TensorFlow', 'Python', 'CoreML', 'Flask'],
    image: '/images/projects/dermai.png',
    link: 'https://devpost.com/software/dermai-rp1xsd',
  },
  {
    title: 'PipeView',
    description: 'Engineered an AI note-taking platform using LLaMA and React.',
    technologies: ['Python', 'React', 'SambaNova', 'LLaMA'],
    image: '/images/projects/pipeview.png',
    link: 'https://devpost.com/software/pipeview',
  },
  // Add more projects as needed
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-primary dark:text-accent"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              className="project-card bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-primary dark:text-accent">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 mr-2 mb-2 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-500 dark:text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent rounded"
                  >
                    View Project <FaExternalLinkAlt className="ml-2" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;