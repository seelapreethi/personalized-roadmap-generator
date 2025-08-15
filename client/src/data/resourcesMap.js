// src/data/resourcesMap.js

// Levels: "Beginner" | "Intermediate" | "Advanced" | "All"
export const RESOURCES = {
  react: {
    keywords: ["react", "reactjs", "react.js", "frontend"],
    items: [
      // Roadmaps
      {
        type: "roadmap",
        title: "Roadmap.sh - React Developer",
        provider: "roadmap.sh",
        level: "All",
        url: "https://roadmap.sh/react",
        tags: ["overview", "checklist", "paths"],
      },
      // Courses
      {
        type: "course",
        title: "React Official Docs (New) – Learn React",
        provider: "react.dev",
        level: "Beginner",
        url: "https://react.dev/learn",
        tags: ["hands-on", "interactive"],
      },
      {
        type: "course",
        title: "Full Modern React Tutorial",
        provider: "Net Ninja (YouTube)",
        level: "Beginner",
        url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9haFPT7J4gXIAZMS2vOGgu3",
        tags: ["video", "components", "hooks"],
      },
      {
        type: "course",
        title: "Epic React Patterns (Free Intro)",
        provider: "Kent C. Dodds (Free intro lessons)",
        level: "Intermediate",
        url: "https://epicreact.dev/articles/",
        tags: ["patterns", "best-practices"],
      },
      // Videos
      {
        type: "video",
        title: "React Hooks in 100 Seconds",
        provider: "Fireship (YouTube)",
        level: "Beginner",
        url: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
        tags: ["hooks", "quick"],
      },
      // Docs
      {
        type: "docs",
        title: "React TypeScript Cheatsheets",
        provider: "react-typescript-cheatsheet",
        level: "Intermediate",
        url: "https://react-typescript-cheatsheet.netlify.app/",
        tags: ["ts", "cheatsheet"],
      },
      // Articles
      {
        type: "article",
        title: "Thinking in React (Updated)",
        provider: "react.dev",
        level: "Beginner",
        url: "https://react.dev/learn/thinking-in-react",
        tags: ["mental-models", "data-flow"],
      },
    ],
  },

  "html css javascript": {
    keywords: ["html", "css", "javascript", "web", "frontend basics"],
    items: [
      { type: "roadmap", title: "Frontend Roadmap", provider: "roadmap.sh", level: "All", url: "https://roadmap.sh/frontend", tags: ["foundation","paths"] },
      { type: "course", title: "freeCodeCamp Responsive Web Design", provider: "freeCodeCamp", level: "Beginner", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", tags: ["html","css"] },
      { type: "course", title: "JavaScript Algorithms & Data Structures", provider: "freeCodeCamp", level: "Beginner", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", tags: ["js","exercises"] },
      { type: "video", title: "HTML & CSS Crash Course", provider: "Net Ninja (YouTube)", level: "Beginner", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G", tags: ["basics"] },
      { type: "docs", title: "MDN Web Docs", provider: "MDN", level: "All", url: "https://developer.mozilla.org/", tags: ["reference"] },
      { type: "article", title: "Learn CSS Layout", provider: "book.mixu", level: "Beginner", url: "https://learnlayout.com/", tags: ["layout"] },
    ],
  },

  node: {
    keywords: ["node", "nodejs", "node.js", "backend", "express"],
    items: [
      { type: "roadmap", title: "Backend Developer Roadmap", provider: "roadmap.sh", level: "All", url: "https://roadmap.sh/backend", tags: ["apis","db"] },
      { type: "course", title: "Node.js Tutorials", provider: "The Net Ninja (YouTube)", level: "Beginner", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9h7FQ8ZzQJmOt3gG1X5U3Y3", tags: ["node","express"] },
      { type: "video", title: "Node.js in 100 Seconds", provider: "Fireship (YouTube)", level: "Beginner", url: "https://www.youtube.com/watch?v=TlB_eWDSMt4", tags: ["quick"] },
      { type: "docs", title: "Node.js Docs", provider: "nodejs.org", level: "All", url: "https://nodejs.org/en/docs", tags: ["reference"] },
      { type: "article", title: "Awesome Node.js", provider: "GitHub Awesome", level: "All", url: "https://github.com/sindresorhus/awesome-nodejs", tags: ["awesome-list"] },
    ],
  },

  python: {
    keywords: ["python", "py", "backend", "data"],
    items: [
      { type: "roadmap", title: "Python Roadmap", provider: "roadmap.sh", level: "All", url: "https://roadmap.sh/python", tags: ["overview"] },
      { type: "course", title: "Python for Everybody (free)", provider: "UMich / Coursera (Audit Free)", level: "Beginner", url: "https://www.coursera.org/specializations/python", tags: ["intro"] },
      { type: "video", title: "Python Full Course", provider: "freeCodeCamp (YouTube)", level: "Beginner", url: "https://www.youtube.com/watch?v=rfscVS0vtbw", tags: ["long-form"] },
      { type: "docs", title: "Python Docs", provider: "docs.python.org", level: "All", url: "https://docs.python.org/3/", tags: ["reference"] },
      { type: "article", title: "Awesome Python", provider: "GitHub Awesome", level: "All", url: "https://github.com/vinta/awesome-python", tags: ["awesome-list"] },
    ],
  },

  dsa: {
    keywords: ["dsa", "data structures", "algorithms", "coding interview"],
    items: [
      { type: "roadmap", title: "Coding Interview Prep", provider: "freeCodeCamp", level: "All", url: "https://www.freecodecamp.org/learn/coding-interview-prep/", tags: ["practice"] },
      { type: "course", title: "Algorithms, Part I (Audit Free)", provider: "Princeton / Coursera", level: "Intermediate", url: "https://www.coursera.org/learn/algorithms-part1", tags: ["algo"] },
      { type: "video", title: "Data Structures Easy to Advanced", provider: "William Fiset (YouTube)", level: "Intermediate", url: "https://www.youtube.com/watch?v=RBSGKlAvoiM", tags: ["deep-dive"] },
      { type: "docs", title: "CP-Algorithms", provider: "e-maxx", level: "Advanced", url: "https://cp-algorithms.com/", tags: ["reference"] },
      { type: "article", title: "Awesome Algorithms", provider: "GitHub Awesome", level: "All", url: "https://github.com/tayllan/awesome-algorithms", tags: ["awesome-list"] },
    ],
  },
};
