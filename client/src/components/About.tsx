// src/components/About.tsx
import React from 'react';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa'; // Example icons from react-icons
import { MdWork } from 'react-icons/md';
import { motion } from 'framer-motion'; // For subtle animations

const skills = [
  { icon: <FaReact size={30} color="#61DBFB" />, label: 'React' },
  { icon: <FaNodeJs size={30} color="#68A063" />, label: 'Node.js' },
  { icon: <FaDatabase size={30} color="#f29111" />, label: 'Database Management' },
  // Add more skills as needed
];



const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image */}
          <div className="md:w-1/3 w-full flex justify-center mb-8 md:mb-0">
            <img
              alt="Wei-Ho Uang"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg"
            />
          </div>

          <div className="md:w-2/3 w-full md:pl-12">
            {/* Introduction */}
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I'm Wei-Ho Uang, a passionate Full-Stack Developer with expertise in building scalable web applications. With a strong foundation in React, Node.js, and database management, I strive to create seamless and user-friendly experiences.
            </p>

            {/* Skills */}
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">My Skills</h3>
            <div className="flex flex-wrap">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center mr-6 mb-4">
                  <div className="mr-2">{skill.icon}</div>
                  <span className="text-gray-700 dark:text-gray-200">{skill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

  
      </div>
    </section>
  );
};

export default About;