// FreeResourcesPage.js
import React, { useState } from "react";
import { motion } from "framer-motion";

const cyberpunkColors = {
  bg: "bg-[#0a0f1f]",
  card: "bg-[#1a1f3f] border border-[#ff00ff]",
  neonText: "text-[#00fff7]",
  accent: "text-[#ff00ff]",
};

const resourcesData = {
  Java: {
    roadmap: "https://roadmap.sh/java",
    courses: [
      { name: "Java Programming Masterclass", link: "https://www.udemy.com/course/java-the-complete-java-developer-course/" },
      { name: "Java Tutorial (W3Schools)", link: "https://www.w3schools.com/java/" },
      { name: "Java FreeCodeCamp Video", link: "https://www.youtube.com/watch?v=grEKMHGYyns" },
    ],
  },
  Python: {
    roadmap: "https://roadmap.sh/python",
    courses: [
      { name: "Python for Everybody", link: "https://www.coursera.org/specializations/python" },
      { name: "Python W3Schools", link: "https://www.w3schools.com/python/" },
      { name: "Python Full Course - FreeCodeCamp", link: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
    ],
  },
  React: {
    roadmap: "https://roadmap.sh/react",
    courses: [
      { name: "React Docs", link: "https://react.dev" },
      { name: "React FreeCodeCamp Course", link: "https://www.youtube.com/watch?v=bMknfKXIFA8" },
      { name: "React W3Schools", link: "https://www.w3schools.com/react/" },
    ],
  },
  "HTML/CSS/JS": {
    roadmap: "https://roadmap.sh/frontend",
    courses: [
      { name: "HTML/CSS/JS Full Guide", link: "https://www.theodinproject.com" },
      { name: "W3Schools", link: "https://www.w3schools.com" },
      { name: "FreeCodeCamp", link: "https://www.freecodecamp.org/learn" },
    ],
  },
  "Node.js": {
    roadmap: "https://roadmap.sh/nodejs",
    courses: [
      { name: "Node.js Crash Course", link: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" },
      { name: "Node.js Docs", link: "https://nodejs.org/en/docs" },
      { name: "W3Schools", link: "https://www.w3schools.com/nodejs/" },
    ],
  },
  MongoDB: {
    roadmap: "https://roadmap.sh/backend",
    courses: [
      { name: "MongoDB University", link: "https://learn.mongodb.com/" },
      { name: "MongoDB Crash Course", link: "https://www.youtube.com/watch?v=-56x56UppqQ" },
      { name: "W3Schools", link: "https://www.w3schools.com/mongodb/" },
    ],
  },
  DSA: {
    roadmap: "https://roadmap.sh/computer-science",
    courses: [
      { name: "Striver's A2Z DSA Sheet", link: "https://takeuforward.org/strivers-a2z-dsa-course/" },
      { name: "GeeksforGeeks DSA", link: "https://www.geeksforgeeks.org/data-structures/" },
      { name: "FreeCodeCamp DSA", link: "https://www.youtube.com/watch?v=8hly31xKli0" },
    ],
  },
  "Machine Learning": {
    roadmap: "https://roadmap.sh/ai",
    courses: [
      { name: "Andrew Ng ML Course", link: "https://www.coursera.org/learn/machine-learning" },
      { name: "Machine Learning Crash Course", link: "https://developers.google.com/machine-learning/crash-course" },
      { name: "FreeCodeCamp ML Course", link: "https://www.youtube.com/watch?v=Gv9_4yMHFhI" },
    ],
  },
  AWS: {
    roadmap: "https://roadmap.sh/devops",
    courses: [
      { name: "AWS Free Training", link: "https://aws.amazon.com/training/" },
      { name: "AWS Certified Cloud Practitioner", link: "https://www.youtube.com/watch?v=SOTamWNgDKc" },
      { name: "AWS Docs", link: "https://docs.aws.amazon.com/" },
    ],
  },
  C: {
    roadmap: "https://roadmap.sh/computer-science",
    courses: [
      { name: "C Programming Tutorial", link: "https://www.youtube.com/watch?v=KJgsSFOSQv0" },
      { name: "W3Schools C", link: "https://www.w3schools.in/c-tutorial/" },
      { name: "Programiz C", link: "https://www.programiz.com/c-programming" },
    ],
  },
  "C++": {
    roadmap: "https://roadmap.sh/computer-science",
    courses: [
      { name: "C++ Full Course", link: "https://www.youtube.com/watch?v=vLnPwxZdW4Y" },
      { name: "GeeksforGeeks C++", link: "https://www.geeksforgeeks.org/c-plus-plus/" },
      { name: "W3Schools C++", link: "https://www.w3schools.com/cpp/" },
    ],
  },
  "System Design": {
    roadmap: "https://roadmap.sh/system-design",
    courses: [
      { name: "System Design Primer", link: "https://github.com/donnemartin/system-design-primer" },
      { name: "System Design Interview", link: "https://www.youtube.com/watch?v=UzLMhqg3_Wc" },
      { name: "Grokking System Design", link: "https://www.educative.io/courses/grokking-the-system-design-interview" },
    ],
  },
  OS: {
    roadmap: "https://roadmap.sh/computer-science",
    courses: [
      { name: "Operating System Concepts", link: "https://www.geeksforgeeks.org/operating-systems/" },
      { name: "OS Crash Course", link: "https://www.youtube.com/watch?v=26QPDBe-NB8" },
      { name: "Neso Academy OS", link: "https://www.youtube.com/watch?v=Fz8D_1dV-1g&list=PLBlnK6fEyqRjoG6aJ4FvFU1tlXbjLBiOP" },
    ],
  },
  DBMS: {
    roadmap: "https://roadmap.sh/backend",
    courses: [
      { name: "DBMS Full Course", link: "https://www.youtube.com/watch?v=27r4Bz0g7pM" },
      { name: "GeeksforGeeks DBMS", link: "https://www.geeksforgeeks.org/dbms/" },
      { name: "W3Schools SQL", link: "https://www.w3schools.com/sql/" },
    ],
  },
};

const FreeResourcesPage = () => {
  const [search, setSearch] = useState("");
  const filteredTech = Object.keys(resourcesData).filter((tech) =>
    tech.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${cyberpunkColors.bg} min-h-screen p-6 text-white`}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-4xl font-bold mb-6 text-center ${cyberpunkColors.neonText}`}
      >
        🚀 Free Learning Resources
      </motion.h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search technology..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[#ff00ff] bg-[#1a1f3f] text-white w-96 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTech.length > 0 ? (
          filteredTech.map((tech) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`${cyberpunkColors.card} rounded-xl p-4 shadow-lg hover:shadow-[#ff00ff]`}
            >
              <h2 className={`text-2xl font-bold mb-2 ${cyberpunkColors.accent}`}>
                {tech}
              </h2>
              <a
                href={resourcesData[tech].roadmap}
                target="_blank"
                rel="noopener noreferrer"
                className={`block mb-2 font-semibold ${cyberpunkColors.neonText}`}
              >
                📍 View Roadmap
              </a>
              <ul className="space-y-1">
                {resourcesData[tech].courses.map((course, index) => (
                  <li key={index}>
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-[#00fff7]"
                    >
                      📚 {course.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-3">
            No resources found. Try another keyword.
          </p>
        )}
      </div>
    </div>
  );
};

export default FreeResourcesPage;
