export const personalData = {
  firstName: 'Abishek',
  lastName: 'Pranav',
  fullName: 'ABISHEK PRANAV S A',
  degree: 'B.Tech IT — Honours in Data Science',
  honoursSpecialization: 'Honours Degree Specialization: Data Science',
  roleTitle: 'Full Stack Developer. Software Engineer',
  typewriterStrings: [
    'Hi There!',
    "I'm Abishek Pranav",
    'Full Stack Developer',
    'Honours in Data Science',
    'Java & React Engineer',
  ],
  bio: 'Passionate Full Stack Developer and B.Tech Information Technology graduate (CGPA 8.03) with an Honours Degree Specialization in Data Science. Experienced in creating innovative IT solutions, tackling complex problems, and building scalable web and event-driven systems using Java, Spring Boot, Python, FastAPI, Apache Kafka, React.js, and SQL/NoSQL databases.',
  email: 'abishekpranav2004@gmail.com',
  phone: '+91-8807765547',
  phoneRaw: '+918807765547',
  address: 'Namakkal, Tamil Nadu - 637201, India',
  fullAddress: 'D/O 4/64 Maniyanoor(PO), Paramathi Velur(TK), Namakkal(DT), Pin Code: 637-201',
  mapUrl: 'https://maps.app.goo.gl/iUHJvPAhJXwJayo68',
  resumeUrl: '/Abishek_Pranav_Resume.pdf',
  avatarUrl: '/avatar.jpg',
  socials: [
    {
      label: 'GH',
      name: 'GitHub',
      url: 'https://github.com/Abishekpranav-Arumugam',
      icon: 'bi-github',
    },
    {
      label: 'IN',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/abishek-pranav-s-a-110698242/',
      icon: 'bi-linkedin',
    },
    {
      label: 'LC',
      name: 'LeetCode',
      url: 'https://leetcode.com/u/abishekpranav2004',
      icon: 'bi-code-square',
    },
    {
      label: 'IG',
      name: 'Instagram',
      url: 'https://www.instagram.com/_abishek_pranav_/',
      icon: 'bi-instagram',
    },
  ],
  heroSkills: [
    { name: 'React.js & Modern Frontend', percent: 94, icon: 'bi-window-stack' },
    { name: 'Java & Spring Boot', percent: 92, icon: 'bi-cpu' },
    { name: 'Python, FastAPI & Kafka', percent: 88, icon: 'bi-lightning-charge' },
    { name: 'PostgreSQL, MySQL & MongoDB', percent: 90, icon: 'bi-database' },
    { name: 'Data Science (Honours)', percent: 88, icon: 'bi-graph-up-arrow' },
  ],
  counters: [
    {
      value: '8.03',
      suffix: 'CGPA',
      label: 'B.Tech IT (Honours: Data Science)',
    },
    {
      value: '5',
      suffix: '+',
      label: 'Production Full-Stack Projects',
    },
    {
      value: '5',
      suffix: '+',
      label: 'Hackathon & Coding Awards',
    },
  ],
};

export const projectsData = [
  {
    id: 'sales-forecasting',
    title: 'Sales Forecasting & Management System',
    category: 'Backend & AI',
    badge: 'FastAPI • Kafka • NLP',
    shortDesc:
      'Built an event-driven FastAPI & PostgreSQL system using Apache Kafka for async sales processing, JWT-based RBAC, NLP demand forecasting chatbot, and Dockerization.',
    fullDesc:
      'Built an event-driven FastAPI and PostgreSQL system using Apache Kafka for asynchronous sales processing and JWT-based Role-Based Access Control (RBAC). Integrated an NLP chatbot to predict demand forecasting and containerized the entire application workflow using Docker.',
    techStack: ['Python', 'FastAPI', 'Apache Kafka', 'PostgreSQL', 'NLP Chatbot', 'JWT RBAC', 'Docker'],
    highlights: [
      'Event-driven architecture with Apache Kafka for asynchronous sales pipeline processing',
      'Secure JWT-based Role-Based Access Control (RBAC) for user and role management',
      'Integrated Natural Language Processing (NLP) chatbot to predict demand forecasting',
      'Full Dockerization for consistent multi-container deployment',
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/Abishekpranav-Arumugam/product-sales-management',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1080&q=85',
  },
  {
    id: 'mentor-connect',
    title: 'Mentor-Connect',
    category: 'Full Stack',
    badge: 'React • Video • Scheduling',
    shortDesc:
      'A React platform that connects mentees with mentors, facilitating session scheduling, 1-on-1 video calls, and expert career guidance.',
    fullDesc:
      'Designed and developed a comprehensive React platform that connects mentees with mentors, facilitating seamless session scheduling, interactive video calls, and structured expert guidance.',
    techStack: ['React.js', 'Tailwind CSS', 'Node.js', 'Video Call Integration', 'REST API'],
    highlights: [
      'Seamless mentor-mentee matching and session scheduling workflows',
      'Integrated video call capabilities for real-time 1-on-1 mentorship',
      'Responsive, intuitive React interface for mentees and mentors',
    ],
    liveUrl: 'https://mentor-connect-hazel.vercel.app',
    githubUrl: 'https://github.com/Abishekpranav-Arumugam/Mentor-Connect',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1080&q=85',
  },
  {
    id: 'healthcare-management',
    title: 'Health Care Management',
    category: 'Full Stack',
    badge: 'React • Firebase OAuth',
    shortDesc:
      'A healthcare system using Firebase OAuth for secure appointment booking and patient management.',
    fullDesc:
      'Engineered a digital healthcare management platform using Firebase OAuth for secure user authentication, enabling streamlined appointment booking, doctor schedule tracking, and centralized patient management.',
    techStack: ['React.js', 'Firebase OAuth', 'Firebase', 'HTML5 / CSS3', 'Vercel'],
    highlights: [
      'Secure authentication powered by Firebase OAuth',
      'Streamlined online appointment booking and schedule management',
      'Dedicated patient management workflow with responsive UI',
    ],
    liveUrl: 'https://healthcare-iota-lime.vercel.app/',
    githubUrl: 'https://github.com/Abishekpranav-Arumugam/healthcare',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1080&q=85',
  },
  {
    id: 'jewellery-shop',
    title: 'Jewellery Shop',
    category: 'E-Commerce',
    badge: 'React • Redux • Stripe',
    shortDesc:
      'Developed a React.js-based shopping site with Redux for state management, Firebase Authentication, and Stripe API for payments.',
    fullDesc:
      'Developed a modern React.js-based e-commerce shopping platform featuring Redux for predictable state management, Firebase Authentication for secure customer accounts, and Stripe API integration for online payment processing.',
    techStack: ['React.js', 'Redux', 'Firebase Authentication', 'Stripe API', 'CSS3'],
    highlights: [
      'Global state management for shopping cart and product catalog using Redux',
      'Secure customer login and registration powered by Firebase Authentication',
      'Seamless checkout and payment processing integrated with the Stripe API',
    ],
    liveUrl: 'https://jewellery-rouge.vercel.app',
    githubUrl: 'https://github.com/Abishekpranav-Arumugam/jewellery',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1080&q=85',
  },
  {
    id: 'language-learning',
    title: 'Language Learning Tool',
    category: 'Full Stack',
    badge: 'Voice • Text • Quizzes',
    shortDesc:
      'An interactive platform that helps learn new languages through voice, text, and quiz-based engagement.',
    fullDesc:
      'Created an interactive language learning platform that helps users learn and practice new languages effectively through voice interaction, structured text lessons, and engaging quiz-based assessments.',
    techStack: ['React.js', 'Web Speech / Voice', 'Interactive Quizzes', 'JavaScript', 'HTML5 / CSS3'],
    highlights: [
      'Interactive voice-based pronunciation and listening exercises',
      'Structured text modules and quiz-based engagement to track learning progress',
      'Clean, user-friendly interface designed for daily language practice',
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/Abishekpranav-Arumugam/Language-Learning/tree/master/language',
    image:
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1080&q=85',
  },
];

export const servicesData = [
  {
    number: '01',
    icon: 'bi-code-slash',
    title: 'Full Stack Web Development',
    description:
      'Developing end-to-end responsive web applications using React.js, HTML5, CSS3, Tailwind CSS, Bootstrap, Node.js, and Java Spring Boot.',
  },
  {
    number: '02',
    icon: 'bi-hdd-network',
    title: 'Event-Driven Backend & APIs',
    description:
      'Building asynchronous backend systems and RESTful services with Java Spring Boot, Python FastAPI, Apache Kafka, and JWT-based Role-Based Access Control (RBAC).',
  },
  {
    number: '03',
    icon: 'bi-database-check',
    title: 'Database Management Systems (DBMS)',
    description:
      'Designing relational and NoSQL database schemas, writing optimized queries, and managing data across PostgreSQL, MySQL, MongoDB, Firebase, and Supabase.',
  },
  {
    number: '04',
    icon: 'bi-graph-up-arrow',
    title: 'Data Science & Containerized Deployment',
    description:
      'Applying Honours Data Science specialization concepts, NLP demand forecasting models, Docker containerization, and foundational AWS Cloud Practitioner knowledge.',
  },
];

export const skillCategories = [
  {
    category: 'Programming Languages',
    icon: 'bi-terminal',
    items: ['Java', 'Python', 'C'],
  },
  {
    category: 'Frontend Development',
    icon: 'bi-layout-text-window-reverse',
    items: ['React JS', 'HTML', 'CSS', 'Angular', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    category: 'Backend Technologies',
    icon: 'bi-server',
    items: ['Node.js', 'Spring Boot', 'FastAPI', 'Apache Kafka'],
  },
  {
    category: 'Databases',
    icon: 'bi-database',
    items: ['MySQL', 'MongoDB', 'PostgreSQL'],
  },
  {
    category: 'Version Control, Tools & Platforms',
    icon: 'bi-boxes',
    items: [
      'Git',
      'GitHub',
      'Docker',
      'Firebase',
      'Supabase',
      'AWS (Cloud Practitioner Essentials - Theoretical)',
    ],
  },
  {
    category: 'Areas of Interest & Soft Skills',
    icon: 'bi-people',
    items: [
      'Full Stack Development',
      'Database Management System',
      'Data Science (Honours)',
      'Leadership',
      'Collaborative Working',
      'Communication Adaptability',
      'Time Management',
    ],
  },
];

export const educationData = [
  {
    period: '2022 - 2026',
    degree: 'B.Tech in Information Technology',
    honours: 'Honours Degree Specialization: Data Science',
    institution: '@Kongu Engineering College, Perundurai',
    score: 'CGPA: 8.03',
    details:
      'Completed Honours Degree Specialization in Data Science. Recipient of the Academic Excellence Award (2022-23) and Top 50 Teams in Smart India Hackathon (2024).',
  },
  {
    period: '2021 - 2022',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: '@SKV School, Namakkal',
    score: 'HSC: 93.3%',
    details: 'Higher Secondary Education with distinction in Mathematics and Computer Science.',
  },
  {
    period: '2019 - 2020',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: '@SKV School, Namakkal',
    score: 'SSLC: 83.6%',
    details: 'Strong academic foundation in analytical problem-solving and core sciences.',
  },
];

export const experienceData = [
  {
    period: 'FEB 2026 - MAY 2026 (4 MONTHS)',
    role: 'Full Stack Development Intern (with Java)',
    company: '@GradTwin Services',
    badge: 'Java Full Stack',
    details:
      'Completed a 4-month Full Stack Development internship working with Java, building enterprise web modules, REST APIs, and responsive user interfaces.',
  },
  {
    period: '2022 - 2026',
    role: 'Honours Specialization in Data Science & Full Stack Projects',
    company: '@Kongu Engineering College',
    badge: 'Data Science & Full Stack',
    details:
      'Built and deployed 5 end-to-end projects including an event-driven FastAPI + Apache Kafka + NLP Sales Forecasting system, Mentor-Connect, Healthcare Management, Jewellery Shop, and Language Learning Tool.',
  },
  {
    period: '2022 - 2026',
    role: 'Hackathon Winner & Competitive Programmer',
    company: '@LeetCode & Inter-College Competitions',
    badge: '5+ Major Awards',
    details:
      '1st Prize Winner at KSR College Hackathon, 2nd Prize at PSG Tech Coding Contest, 1st Prize Paper Presentation at KEC, and Top 50 Team in Smart India Hackathon 2024.',
  },
];

export const achievementsData = [
  {
    id: 1,
    title: 'Academic Excellence Award (2022-23)',
    organization: 'Kongu Engineering College, Perundurai',
    year: '2022 - 2023',
    highlight: 'Academic Honour',
    quote:
      'Recognized for outstanding academic performance in B.Tech Information Technology at Kongu Engineering College.',
    icon: 'bi-award-fill',
  },
  {
    id: 2,
    title: '1st Prize — Hackathon',
    organization: 'KSR College of Engineering',
    year: 'Winner',
    highlight: '1st Prize Winner',
    quote:
      'Secured 1st Prize at the KSR College of Engineering Hackathon for building and demonstrating an innovative software solution.',
    icon: 'bi-trophy-fill',
  },
  {
    id: 3,
    title: '2nd Prize — Coding Contest',
    organization: 'PSG College of Technology',
    year: 'Winner',
    highlight: '2nd Prize Winner',
    quote:
      'Won 2nd Prize in the inter-collegiate Coding Contest at PSG College of Technology, demonstrating strong algorithmic problem-solving skills.',
    icon: 'bi-code-slash',
  },
  {
    id: 4,
    title: '1st Prize — Paper Presentation',
    organization: 'Kongu Engineering College (KEC)',
    year: 'Winner',
    highlight: '1st Prize Winner',
    quote:
      'Awarded 1st Prize for technical Paper Presentation at Kongu Engineering College (KEC).',
    icon: 'bi-easel2-fill',
  },
  {
    id: 5,
    title: 'Top 50 Teams — Smart India Hackathon (SIH)',
    organization: 'Smart India Hackathon (Internal Round)',
    year: '2024',
    highlight: 'Top 50 Teams',
    quote:
      'Selected among the Top 50 Teams in the Smart India Hackathon (Internal Round, 2024) for tackling real-world engineering challenges.',
    icon: 'bi-lightbulb-fill',
  },
];

export const certificationsData = [
  {
    id: 'mongodb-assoc',
    title: 'MONGODB Associate Developer (2025)',
    issuer: 'MongoDB',
    date: '2025',
    category: 'Database Certification',
    description:
      'Official MongoDB Associate Developer certification validating proficiency in NoSQL database management, CRUD operations, indexing, and aggregation pipelines.',
    credentialUrl: '/Abishek_Pranav_Resume.pdf',
    image:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'aws-cloud',
    title: 'AWS Cloud Practitioner Essentials – Amazon Web Services (2026)',
    issuer: 'Amazon Web Services (AWS Skill Builder)',
    date: '2026',
    category: 'Cloud Fundamentals',
    description:
      'Completed the AWS Cloud Practitioner Essentials modules in AWS Skill Builder, covering theoretical cloud computing concepts, core AWS services, security fundamentals, and pricing.',
    credentialUrl: '/Abishek_Pranav_Resume.pdf',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gradtwin-java',
    title: 'Full Stack Developer (Java) Internship – Gradtwin Services (2026)',
    issuer: 'GradTwin Services',
    date: 'Feb – May 2026',
    category: 'Internship Certification',
    description:
      '4-month Full Stack Development internship certification with Java at GradTwin Services (Feb–May 2026).',
    credentialUrl: '/Abishek_Pranav_Resume.pdf',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  },
];
