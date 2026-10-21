import React, { useState, useEffect } from 'react';
import {
  personalData,
  projectsData,
  servicesData,
  skillCategories,
  educationData,
  experienceData,
  achievementsData,
  certificationsData,
} from './data/portfolioData';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [achievementIndex, setAchievementIndex] = useState(0);

  // Typewriter state
  const [typeText, setTypeText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initial preloader & theme setup
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.classList.add('loaded');
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  // Toggle dark/light theme
  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Typewriter effect matching Gray template
  useEffect(() => {
    const strings = personalData.typewriterStrings;
    const currentWord = strings[wordIndex % strings.length];
    const speed = isDeleting ? 45 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting && typeText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1400);
      } else if (isDeleting && typeText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % strings.length);
      } else {
        setTypeText(
          currentWord.substring(0, typeText.length + (isDeleting ? -1 : 1))
        );
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typeText, isDeleting, wordIndex]);

  // Scroll-spy for sticky navigation
  useEffect(() => {
    const sectionIds = [
      'about',
      'portfolio',
      'services',
      'resume',
      'testimonial',
      'blog',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About Me', short: 'A' },
    { id: 'portfolio', label: 'Portfolio', short: 'P' },
    { id: 'services', label: 'Services & Skills', short: 'S' },
    { id: 'resume', label: 'Resume', short: 'R' },
    { id: 'testimonial', label: 'Achievements', short: 'W' },
    { id: 'blog', label: 'Certifications', short: 'C' },
    { id: 'contact', label: 'Contact', short: 'M' },
  ];

  const categories = ['all', 'Full Stack', 'Backend & AI', 'E-Commerce'];

  const filteredProjects =
    selectedFilter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedFilter);

  const handlePrevAchievement = () => {
    setAchievementIndex((prev) =>
      prev === 0 ? achievementsData.length - 1 : prev - 1
    );
  };

  const handleNextAchievement = () => {
    setAchievementIndex((prev) => (prev + 1) % achievementsData.length);
  };

  const visibleAchievements = [
    achievementsData[achievementIndex % achievementsData.length],
    achievementsData[(achievementIndex + 1) % achievementsData.length],
  ];

  // Direct email delivery to abishekpranav2004@gmail.com
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    const emailSubject =
      formData.subject || `Portfolio Message from ${formData.name}`;
    const emailBody = `Hello Abishek Pranav,\n\nYou have received a new message from your portfolio website:\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${emailSubject}\n\nMessage:\n${formData.message}`;

    try {
      // On localhost use the activated localhost token; on Vercel/live domain use email endpoint so it works on any domain
      const isLocal =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';
      const formEndpoint = isLocal
        ? 'https://formsubmit.co/ajax/04b8ec8b41a388d4879735c47c4ec318'
        : `https://formsubmit.co/ajax/${personalData.email}`;

      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Subject: emailSubject,
          Message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio Contact: ${emailSubject}`,
          _template: 'table',
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true)) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback: open user's default mail client pre-addressed to abishekpranav2004@gmail.com
        const mailtoLink = `mailto:${personalData.email}?subject=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
        setSubmitStatus('mailto_opened');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      const mailtoLink = `mailto:${personalData.email}?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      setSubmitStatus('mailto_opened');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className={isLoaded ? 'loaded' : ''}>
      {/* Preloader matching Gray Template */}
      <div
        className={`preloader z-30 fixed top-0 left-0 bg-black w-full h-full text-center transition-all ease-out duration-500 ${
          isLoaded ? 'invisible opacity-0 pointer-events-none' : 'visible opacity-100'
        }`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-3 font-mono font-normal uppercase text-white">
          <span className="opacity-100 inline-block transition ease-linear duration-100 animate-loader">
            L
          </span>
          <span className="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-100">
            O
          </span>
          <span className="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-200">
            A
          </span>
          <span className="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-300">
            D
          </span>
          <span className="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-400">
            I
          </span>
          <span className="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-500">
            N
          </span>
          <span className="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-600">
            G
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="container max-w-[1320px] mx-auto px-5 xl:px-3">
        {/* Slide-Out Right Menu Drawer (Gray Template Toggle Menu) */}
        <div>
          {menuOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-20 transition-opacity"
              onClick={() => setMenuOpen(false)}
            />
          )}
          <div
            className={`toggle-menu z-30 fixed top-0 right-0 w-80 sm:w-96 h-full bg-black dark:bg-boxDark dark:shadow-darkBox px-10 py-12 transition-all ease-out duration-150 ${
              menuOpen
                ? 'show translate-x-0 opacity-100 visible'
                : 'translate-x-3 opacity-0 invisible'
            }`}
          >
            <h6 className="block font-mono font-normal uppercase text-sm tracking-[0.5px] text-white/70 mb-1">
              Phone:
            </h6>
            <h4 className="font-poppins font-medium text-xl sm:text-2xl text-white">
              <a href={`tel:${personalData.phoneRaw}`} className="hover:underline">
                {personalData.phone}
              </a>
            </h4>

            <div className="mt-6">
              <h6 className="block font-mono font-normal uppercase text-sm tracking-[0.5px] text-white/70 mb-1">
                Email:
              </h6>
              <h4 className="font-poppins font-medium text-base sm:text-lg text-white break-all">
                <a href={`mailto:${personalData.email}`} className="hover:underline">
                  {personalData.email}
                </a>
              </h4>
            </div>

            <div className="mt-6">
              <h6 className="block font-mono font-normal uppercase text-sm tracking-[0.5px] text-white/70 mb-1">
                Education &amp; Honours:
              </h6>
              <p className="font-poppins text-sm text-white/90">
                B.Tech IT @ Kongu Engineering College (CGPA 8.03)
              </p>
              <p className="font-mono text-xs text-white/75 mt-1">
                {personalData.honoursSpecialization}
              </p>
            </div>

            <ul className="space-x-2 mt-6">
              {personalData.socials.map((soc) => (
                <li key={soc.name} className="list-none inline-block">
                  <a
                    className="inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white transition ease-out duration-150 hover:bg-white/25"
                    aria-label={soc.name}
                    title={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className={`bi ${soc.icon}`}></i>
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-10 space-y-3">
              <li className="relative pl-3 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-white before:opacity-70 before:w-1 before:h-1 before:rounded-full transition-all duration-100 hover:before:opacity-100">
                <button
                  onClick={toggleTheme}
                  className="font-mono font-medium uppercase text-sm tracking-[0.5px] text-white hover:underline"
                  aria-label="Toggle theme"
                >
                  {darkMode ? 'Light Version' : 'Dark Version'}
                </button>
              </li>
              <li className="relative pl-3 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-white before:opacity-70 before:w-1 before:h-1 before:rounded-full transition-all duration-100 hover:before:opacity-100">
                <a
                  className="font-mono font-medium uppercase text-sm tracking-[0.5px] text-white hover:underline"
                  href={personalData.resumeUrl}
                  download="Abishek_Pranav_SA_Resume.pdf"
                >
                  Download Resume (PDF)
                </a>
              </li>
              <li className="relative pl-3 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-white before:opacity-70 before:w-1 before:h-1 before:rounded-full transition-all duration-100 hover:before:opacity-100">
                <a
                  className="font-mono font-medium uppercase text-sm tracking-[0.5px] text-white hover:underline"
                  href="https://leetcode.com/u/abishekpranav2004"
                  target="_blank"
                  rel="noreferrer"
                >
                  LeetCode Profile
                </a>
              </li>
            </ul>

            <div className="absolute bottom-12 left-10 right-10">
              <p className="text-white/70 text-sm">
                © {new Date().getFullYear()} {personalData.fullName}.
              </p>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="menu-close absolute top-4 right-4 inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white text-xl transition ease-out duration-150 hover:bg-white/20"
              aria-label="Close menu"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>

          {/* Header */}
          <header id="header" className="lg:flex lg:justify-between">
            <div className="flex h-[50px] items-center space-x-5 lg:order-2 justify-end">
              <ul className="space-x-3.5 font-mono font-medium uppercase text-sm tracking-[0.5px] flex items-center">
                {personalData.socials.map((soc) => (
                  <li key={soc.label} className="list-none inline-block">
                    <a
                      className="hover:underline dark:text-white"
                      href={soc.url}
                      target="_blank"
                      rel="noreferrer"
                      title={soc.name}
                    >
                      {soc.label}
                    </a>
                  </li>
                ))}
                <li className="list-none inline-block">
                  <a
                    className="hover:underline dark:text-white font-semibold"
                    href={personalData.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="View Official Resume PDF"
                  >
                    CV
                  </a>
                </li>
                <li className="list-none inline-block">
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-black/20 dark:border-white/20 border-dashed hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black transition ease-out duration-150"
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    aria-label="Toggle color theme"
                  >
                    <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'} text-xs`}></i>
                  </button>
                </li>
              </ul>

              <button
                onClick={() => setMenuOpen(true)}
                className="menu-btn group relative w-[50px] h-[50px] bg-black dark:bg-boxDark rounded-b-lg"
                aria-label="Toggle navigation menu"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-1 h-1 rounded-full transition-all ease-linear duration-100 delay-100 group-hover:scale-[3]"></span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 before:content-[''] before:absolute before:top-0 before:-left-[10px] before:bg-white before:w-1 before:h-1 before:rounded-full before:transition-all before:ease-linear before:duration-100 after:content-[''] after:absolute after:top-0 after:-right-[10px] after:bg-white after:w-1 after:h-1 after:rounded-full after:transition-all after:ease-linear after:duration-100 group-hover:before:left-0 group-hover:before:opacity-0 group-hover:after:right-0 group-hover:after:opacity-0"></span>
              </button>
            </div>

            <div className="py-7 lg:order-1">
              <h1 className="text-5xl xl:text-7xl font-poppins font-semibold dark:text-white">
                {personalData.firstName}{' '}
                <span className="stroke-text">{personalData.lastName}</span>
              </h1>
            </div>
          </header>
        </div>

        {/* Main 2-Column Layout */}
        <div className="space-y-6 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-12">
          {/* Left Sticky Navigation Sidebar */}
          <div className="z-10 sticky top-2 lg:top-6 lg:h-fit lg:w-1/4 bg-black/90 dark:bg-boxDark backdrop-blur-[5px] rounded-lg px-4 py-3 lg:bg-black lg:px-8 lg:py-5 xl:px-10 xl:py-7 lg:backdrop-blur-none shadow-sectionBoxShadow">
            <ul className="font-mono font-normal uppercase text-sm tracking-wider text-center lg:text-left space-x-2 sm:space-x-4 lg:space-x-0">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="list-none inline-block lg:block">
                    <a
                      href={`#${item.id}`}
                      onClick={() => setActiveSection(item.id)}
                      className={`section-link group inline-flex justify-center items-center lg:block lg:justify-normal relative w-9 h-9 border border-transparent border-dashed rounded-full lg:w-auto lg:h-auto lg:border-none lg:rounded-none text-white/70 py-3 transition ease-linear duration-100 hover:text-white ${
                        isActive ? 'active' : ''
                      }`}
                    >
                      <span className="hidden lg:inline-block">{item.label}</span>
                      <span className="lg:hidden">{item.short}</span>
                      <span
                        className={`nav-circle hidden lg:inline-block absolute top-1/2 right-0 -translate-y-1/2 w-[5px] h-[5px] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:w-[5px] before:h-[5px] before:rounded-full before:opacity-70 before:transition-all before:ease-out before:duration-200 group-hover:before:opacity-100 ${
                          isActive ? 'before:opacity-100' : ''
                        }`}
                      ></span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Subtle Desktop Quick Resume & Status Footer inside Sidebar */}
            <div className="hidden lg:block mt-6 pt-6 border-t border-white/15 border-dashed">
              <div className="flex items-center space-x-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-xs uppercase tracking-wider text-white/80">
                  Open to SDE / Full Stack Roles
                </span>
              </div>
              <a
                href={personalData.resumeUrl}
                download="Abishek_Pranav_SA_Resume.pdf"
                className="w-full inline-flex items-center justify-center space-x-2 border border-white/30 border-dashed rounded-full px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-white hover:bg-white hover:text-black transition ease-out duration-150"
              >
                <i className="bi bi-file-earmark-arrow-down"></i>
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Right Content Sections */}
          <div className="lg:w-3/4 space-y-6 pb-12">
            {/* ==================== ABOUT ME SECTION ==================== */}
            <div
              id="about"
              className="section bg-white dark:bg-boxDark rounded-lg px-6 py-8 md:px-8 md:py-10 lg:p-12 shadow-sectionBoxShadow hover:shadow-sectionBoxShadowHover transition ease-out duration-[160ms]"
            >
              <div className="lg:flex lg:space-x-10 items-center">
                {/* Hero Avatar with Typewriter Pill */}
                <div className="relative h-fit mb-6 lg:mb-0 flex-shrink-0 mx-auto lg:mx-0 w-fit">
                  <img
                    alt={personalData.fullName}
                    width="256"
                    height="256"
                    src={personalData.avatarUrl}
                    className="min-w-52 min-h-52 max-w-64 max-h-64 w-60 h-60 object-cover rounded-full border-2 border-black/10 dark:border-white/15 shadow-avatarText"
                  />
                  <div className="absolute bottom-4 left-2 bg-black/45 dark:bg-black/70 px-4 py-2 rounded-full shadow-avatarText backdrop-blur-[5px] text-white font-mono font-normal uppercase text-xs sm:text-sm tracking-wider">
                    <span>{typeText}</span>
                    <span className="inline-block w-[2px] h-3.5 bg-white ml-1 animate-pulse"></span>
                  </div>
                </div>

                {/* About Content */}
                <div>
                  <h6
                    className="font-mono font-medium uppercase text-sm tracking-wider relative pt-4 mb-5 dark:text-white before:content-['//'] before:pr-2 after:content-[attr(data-backdrop-text)] after:absolute after:top-0 after:left-0 after:font-poppins after:font-bold after:uppercase after:text-4xl after:opacity-15"
                    data-backdrop-text="About Me"
                  >
                    About Me
                  </h6>
                  <h2 className="text-3xl sm:text-4xl font-poppins font-semibold mb-2 dark:text-white">
                    {personalData.roleTitle}
                  </h2>

                  {/* Honours Degree Specialization Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-xs uppercase tracking-wider font-medium">
                      <i className="bi bi-mortarboard-fill"></i>
                      <span>B.Tech IT • {personalData.honoursSpecialization}</span>
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-4">
                    {personalData.heroSkills.map((sk) => (
                      <li
                        key={sk.name}
                        className="list-none inline-block px-4 py-2 me-2 rounded-full border border-black/20 dark:border-white/30 border-dashed text-pColor hover:text-black dark:text-white/70 dark:hover:text-white transition ease-linear duration-100 text-sm"
                      >
                        <i className={`bi ${sk.icon} pe-1.5`}></i> {sk.name}{' '}
                        <div className="inline-block font-mono text-xs">
                          (<span>{sk.percent}</span>%)
                        </div>
                      </li>
                    ))}
                  </ul>

                  <p className="text-pColor dark:text-white/70 leading-7">
                    {personalData.bio}
                  </p>

                  {/* Quick Executive Links for HR / Team Leads */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <a
                      href={personalData.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider transition ease-out duration-150 hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      <i className="bi bi-file-earmark-pdf"></i>
                      <span>View Official Resume</span>
                    </a>
                    <a
                      href="https://github.com/Abishekpranav-Arumugam"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 border border-black border-dashed rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-black hover:text-white transition ease-out duration-150 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                    >
                      <i className="bi bi-github"></i>
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://leetcode.com/u/abishekpranav2004"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 border border-black border-dashed rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-black hover:text-white transition ease-out duration-150 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                    >
                      <i className="bi bi-code-square"></i>
                      <span>LeetCode</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* 3 Stroked Counters Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8 pt-6 border-t border-black/10 dark:border-white/10 border-dashed">
                {personalData.counters.map((item) => (
                  <div key={item.label} className="flex items-center">
                    <div className="pe-3">
                      <h1 className="font-mono font-semibold text-5xl xl:text-6xl stroke-text">
                        <span>{item.value}</span>
                      </h1>
                    </div>
                    <div className="dark:text-white">
                      <h4 className="block text-xl font-mono font-medium mb-0.5">
                        {item.suffix}
                      </h4>
                      <p className="font-mono font-medium text-xs sm:text-sm uppercase tracking-[0.5px] text-pColor dark:text-white/70">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ==================== PORTFOLIO / PROJECTS SECTION ==================== */}
            <div
              id="portfolio"
              className="section bg-white dark:bg-boxDark rounded-lg px-6 py-8 md:px-8 md:py-10 lg:p-12 shadow-sectionBoxShadow hover:shadow-sectionBoxShadowHover transition ease-out duration-[160ms]"
            >
              <div className="md:w-4/5 lg:w-3/4">
                <h6
                  className="font-mono font-medium uppercase text-sm tracking-wider relative pt-4 mb-5 dark:text-white before:content-['//'] before:pr-2 after:content-[attr(data-backdrop-text)] after:absolute after:top-0 after:left-0 after:font-poppins after:font-bold after:uppercase after:text-4xl after:opacity-15"
                  data-backdrop-text="Portfolio"
                >
                  Portfolio
                </h6>
                <h2 className="text-3xl lg:text-4xl font-poppins font-semibold mb-3 lg:mb-4 dark:text-white">
                  My Latest Works
                </h2>
                <p className="text-pColor dark:text-white/70">
                  Full-stack web applications and event-driven backend systems built with React.js, FastAPI, Apache Kafka, PostgreSQL, Redux, Firebase, and Stripe.
                </p>
              </div>

              <div className="filter mt-6 lg:mt-10">
                {/* Filter Pills */}
                <ul className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const active = selectedFilter === cat;
                    return (
                      <li
                        key={cat}
                        onClick={() => setSelectedFilter(cat)}
                        className={`list-none inline-block font-mono text-sm px-4 py-2 border border-black border-dashed rounded-full transition ease-linear duration-100 cursor-pointer dark:border-white ${
                          active
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : 'hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black'
                        }`}
                      >
                        {cat === 'all' ? 'Show All' : cat}
                      </li>
                    );
                  })}
                </ul>

                {/* Portfolio Grid matching Gray Template */}
                <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="portfolio-item flex flex-col bg-bodyBg/60 dark:bg-black/40 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 border-dashed"
                    >
                      <div
                        onClick={() => setSelectedProject(project)}
                        className="relative overflow-hidden group cursor-pointer h-64 sm:h-72 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/80 after:via-black/35 after:to-transparent after:opacity-90 hover:after:opacity-100 after:transition after:ease-out after:duration-[160ms]"
                      >
                        <img
                          alt={project.title}
                          src={project.image}
                          className="w-full h-full object-cover transition ease-custom duration-500 group-hover:scale-105 group-hover:blur-[1.4px]"
                        />
                        <span className="z-[1] absolute top-4 right-4 bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-[5px] text-white font-mono font-normal text-xs uppercase tracking-[0.5px]">
                          {project.badge}
                        </span>
                        <div className="z-[1] absolute bottom-0 left-0 w-full px-6 pb-5 transition ease-out duration-[160ms]">
                          <span className="block font-mono text-xs uppercase tracking-wider text-white/80 mb-1">
                            {project.category}
                          </span>
                          <h3 className="font-poppins font-semibold text-2xl lg:text-3xl tracking-[0.5px] portfolio-stroke-text transition-all ease-linear duration-100">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/* Structured HR / Tech Lead Summary Bar */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-pColor dark:text-white/75 text-sm leading-6 mb-4">
                            {project.shortDesc}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-black/20 dark:border-white/20 border-dashed text-black/80 dark:text-white/80"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/10 dark:border-white/10 border-dashed">
                          <div className="flex items-center space-x-3.5">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1.5 font-mono text-xs uppercase tracking-wider font-medium hover:underline dark:text-white"
                              >
                                <i className="bi bi-box-arrow-up-right"></i>
                                <span>Live Link</span>
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1.5 font-mono text-xs uppercase tracking-wider text-pColor hover:text-black dark:text-white/75 dark:hover:text-white"
                              >
                                <i className="bi bi-github"></i>
                                <span>GitHub</span>
                              </a>
                            )}
                          </div>

                          <button
                            onClick={() => setSelectedProject(project)}
                            className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-black/30 dark:border-white/30 border-dashed hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black transition"
                          >
                            Project Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ==================== SERVICES & TECHNICAL SKILLS SECTION ==================== */}
            <div
              id="services"
              className="section bg-white dark:bg-boxDark rounded-lg px-6 py-8 md:px-8 md:py-10 lg:p-12 shadow-sectionBoxShadow hover:shadow-sectionBoxShadowHover transition ease-out duration-[160ms]"
            >
              <div className="md:w-4/5 lg:w-3/4">
                <h6
                  className="font-mono font-medium uppercase text-sm tracking-wider relative pt-4 mb-5 dark:text-white before:content-['//'] before:pr-2 after:content-[attr(data-backdrop-text)] after:absolute after:top-0 after:left-0 after:font-poppins after:font-bold after:uppercase after:text-4xl after:opacity-15"
                  data-backdrop-text="Services"
                >
                  Services
                </h6>
                <h2 className="text-3xl lg:text-4xl font-poppins font-semibold mb-3 lg:mb-4 dark:text-white">
                  What I Do &amp; Core Competencies
                </h2>
                <p className="text-pColor dark:text-white/70">
                  Focused on Full Stack Development, Database Management Systems, Event-Driven Backend Engineering, and Data Science (Honours).
                </p>
              </div>

              {/* Gray Template Numbered Services List */}
              <div className="mt-6 lg:mt-10 divide-y divide-dashed divide-black/20 dark:divide-white/20">
                {servicesData.map((service) => (
                  <div
                    key={service.number}
                    className="md:flex py-6 lg:py-8 space-y-2.5 md:space-y-0 items-start"
                  >
                    <div className="md:min-w-[90px]">
                      <span className="font-mono font-semibold text-5xl stroke-text">
                        {service.number}
                      </span>
                    </div>
                    <div className="md:min-w-[270px] dark:text-white pr-4">
                      <i className={`bi ${service.icon} text-2xl mb-2 block`}></i>
                      <h6 className="font-mono font-medium text-sm uppercase tracking-[0.5px]">
                        {service.title}
                      </h6>
                    </div>
                    <div>
                      <p className="text-pColor dark:text-white/70 leading-7">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Structured Technical Skills Matrix for HR & Tech Leads */}
              <div className="mt-10 pt-8 border-t border-black/15 dark:border-white/15 border-dashed">
                <h3 className="font-poppins font-semibold text-2xl mb-6 dark:text-white">
                  Technical Skills &amp; Tooling Matrix
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {skillCategories.map((group) => (
                    <div
                      key={group.category}
                      className="p-5 rounded-lg border border-black/20 dark:border-white/20 border-dashed bg-bodyBg/40 dark:bg-black/30"
                    >
                      <div className="flex items-center space-x-2.5 mb-3 dark:text-white">
                        <i className={`bi ${group.icon} text-lg`}></i>
                        <h5 className="font-mono font-medium uppercase text-sm tracking-wider">
                          {group.category}
                        </h5>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3.5 py-1.5 rounded-full border border-black/20 dark:border-white/25 border-dashed font-mono text-xs text-pColor hover:text-black hover:border-black dark:text-white/80 dark:hover:text-white transition"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ==================== RESUME: EDUCATION & EXPERIENCE SECTION ==================== */}
            <div
              id="resume"
              className="section bg-white dark:bg-boxDark rounded-lg px-6 py-8 md:px-8 md:py-10 lg:p-12 shadow-sectionBoxShadow hover:shadow-sectionBoxShadowHover transition ease-out duration-[160ms]"
            >
              <div className="md:flex md:items-end md:justify-between">
                <div className="md:w-4/5 lg:w-3/4">
                  <h6
                    className="font-mono font-medium uppercase text-sm tracking-wider relative pt-4 mb-5 dark:text-white before:content-['//'] before:pr-2 after:content-[attr(data-backdrop-text)] after:absolute after:top-0 after:left-0 after:font-poppins after:font-bold after:uppercase after:text-4xl after:opacity-15"
                    data-backdrop-text="Resume"
                  >
                    Resume
                  </h6>
                  <h2 className="text-3xl lg:text-4xl font-poppins font-semibold mb-3 lg:mb-4 dark:text-white">
                    Education &amp; Experience
                  </h2>
                  <p className="text-pColor dark:text-white/70">
                    Academic background including Honours Degree Specialization in Data Science and Full Stack Java Internship experience.
                  </p>
                </div>

                <div className="mt-4 md:mt-0">
                  <a
                    href={personalData.resumeUrl}
                    download="Abishek_Pranav_SA_Resume.pdf"
                    className="inline-flex items-center space-x-2 border border-black border-dashed rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-black hover:text-white transition ease-out duration-[120ms] dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                  >
                    <i className="bi bi-download"></i>
                    <span>Download CV</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mt-6 lg:mt-12">
                {/* Education Timeline Column */}
                <div className="relative pl-5 space-y-7 before:content-[''] before:absolute before:top-0 before:left-0 before:w-[1px] before:h-full before:border-l before:border-black/20 dark:before:border-white/20 before:border-dashed">
                  <div className="text-3xl dark:text-white flex items-center space-x-3">
                    <i className="bi bi-mortarboard"></i>
                    <span className="font-mono text-sm uppercase tracking-wider">
                      Education
                    </span>
                  </div>

                  {educationData.map((edu) => (
                    <div key={edu.degree} className="group">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="relative inline-block px-4 py-2 rounded-full border border-black/20 dark:border-white/20 border-dashed font-mono font-medium uppercase text-sm tracking-[0.5px] text-pColor dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition ease-linear duration-100 before:content-[''] before:absolute before:top-1/2 before:left-[-20px] before:w-[20px] before:h-[1px] before:border-t before:border-black/20 dark:before:border-white/20 before:border-dashed after:content-[''] after:absolute after:top-1/2 after:left-[-22px] after:-translate-y-1/2 after:bg-black dark:after:bg-white after:w-[5px] after:h-[5px] after:rounded-full">
                          {edu.period}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-semibold">
                          {edu.score}
                        </span>
                      </div>
                      <h4 className="font-poppins font-medium text-lg lg:text-xl mt-2 mb-1 lg:mt-3 lg:mb-1.5 dark:text-white">
                        {edu.degree}
                      </h4>
                      {edu.honours && (
                        <div className="mb-1.5">
                          <span className="inline-block px-3 py-1 rounded-full border border-black/30 dark:border-white/30 border-dashed font-mono text-xs font-medium text-black dark:text-white">
                            ★ {edu.honours}
                          </span>
                        </div>
                      )}
                      <span className="block font-mono text-xs uppercase tracking-wider text-pColor dark:text-white/70 mb-2">
                        {edu.institution}
                      </span>
                      <p className="text-sm text-pColor dark:text-white/60 leading-6">
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Experience & Internship Timeline Column */}
                <div className="relative pl-5 space-y-7 before:content-[''] before:absolute before:top-0 before:left-0 before:w-[1px] before:h-full before:border-l before:border-black/20 dark:before:border-white/20 before:border-dashed">
                  <div className="text-3xl dark:text-white flex items-center space-x-3">
                    <i className="bi bi-briefcase"></i>
                    <span className="font-mono text-sm uppercase tracking-wider">
                      Internship &amp; Experience
                    </span>
                  </div>

                  {experienceData.map((exp) => (
                    <div key={exp.role} className="group">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="relative inline-block px-4 py-2 rounded-full border border-black/20 dark:border-white/20 border-dashed font-mono font-medium uppercase text-xs sm:text-sm tracking-[0.5px] text-pColor dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition ease-linear duration-100 before:content-[''] before:absolute before:top-1/2 before:left-[-20px] before:w-[20px] before:h-[1px] before:border-t before:border-black/20 dark:before:border-white/20 before:border-dashed after:content-[''] after:absolute after:top-1/2 after:left-[-22px] after:-translate-y-1/2 after:bg-black dark:after:bg-white after:w-[5px] after:h-[5px] after:rounded-full">
                          {exp.period}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-semibold">
                          {exp.badge}
                        </span>
                      </div>
                      <h4 className="font-poppins font-medium text-lg lg:text-xl mt-2 mb-1 lg:mt-3 lg:mb-1.5 dark:text-white">
                        {exp.role}
                      </h4>
                      <span className="block font-mono text-xs uppercase tracking-wider text-pColor dark:text-white/70 mb-2">
                        {exp.company}
                      </span>
                      <p className="text-sm text-pColor dark:text-white/60 leading-6">
                        {exp.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ==================== ACHIEVEMENTS & HONOURS SECTION (Gray Testimonial Style) ==================== */}
            <div
              id="testimonial"
              className="section bg-white dark:bg-boxDark rounded-lg px-6 py-8 md:px-8 md:py-10 lg:p-12 shadow-sectionBoxShadow hover:shadow-sectionBoxShadowHover transition ease-out duration-[160ms]"
            >
              <div className="flex justify-between items-center">
                <h6
                  className="font-mono font-medium uppercase text-sm tracking-wider relative pt-4 dark:text-white before:content-['//'] before:pr-2 after:content-[attr(data-backdrop-text)] after:absolute after:top-0 after:left-0 after:font-poppins after:font-bold after:uppercase after:text-4xl after:opacity-15"
                  data-backdrop-text="Achievements"
                >
                  Honours &amp; Awards
                </h6>
                <ul className="space-x-1.5 flex">
                  <li
                    onClick={handlePrevAchievement}
                    className="list-none inline-flex justify-center items-center w-10 h-10 rounded-full border border-black border-dashed cursor-pointer transition ease-out duration-[120ms] hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                    title="Previous Achievement"
                  >
                    <i className="bi bi-arrow-left"></i>
                  </li>
                  <li
                    onClick={handleNextAchievement}
                    className="list-none inline-flex justify-center items-center w-10 h-10 rounded-full border border-black border-dashed cursor-pointer transition ease-out duration-[120ms] hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                    title="Next Achievement"
                  >
                    <i className="bi bi-arrow-right"></i>
                  </li>
                </ul>
              </div>

              {/* Featured 2-Column Carousel Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                {visibleAchievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-6 rounded-lg border border-black/15 dark:border-white/15 border-dashed bg-bodyBg/40 dark:bg-black/30"
                  >
                    <div className="z-[1] relative pt-4 pl-4">
                      <div className="-z-[1] absolute top-0 left-0 text-5xl opacity-10 dark:text-white">
                        <i className="bi bi-quote"></i>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-yellow-400 space-x-1">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                        <span className="font-mono text-xs uppercase px-3 py-1 rounded-full border border-black/20 dark:border-white/20 border-dashed dark:text-white">
                          {ach.highlight}
                        </span>
                      </div>
                      <p className="text-pColor dark:text-white/70 leading-7 text-sm">
                        {ach.quote}
                      </p>
                    </div>
                    <div className="flex items-center mt-5 pt-4 border-t border-black/10 dark:border-white/10 border-dashed">
                      <div className="me-4 w-[56px] h-[56px] rounded-full bg-black text-white dark:bg-white dark:text-black inline-flex items-center justify-center text-2xl flex-shrink-0">
                        <i className={`bi ${ach.icon}`}></i>
                      </div>
                      <div>
                        <h4 className="font-poppins font-medium text-base md:text-lg dark:text-white">
                          {ach.title}
                        </h4>
                        <span className="text-xs font-mono uppercase tracking-wider text-pColor dark:text-white/70">
                          {ach.organization} ({ach.year})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complete 5 Achievements Quick Overview Pills */}
              <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 border-dashed">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {achievementsData.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setAchievementIndex(idx)}
                      className={`text-left px-4 py-3 rounded-lg border border-dashed transition flex items-center space-x-3 ${
                        idx === achievementIndex
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                          : 'border-black/20 dark:border-white/20 text-pColor dark:text-white/70 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <i className={`bi ${item.icon} text-lg`}></i>
                      <div className="overflow-hidden">
                        <p className="font-poppins font-medium text-xs truncate">
                          {item.title}
                        </p>
                        <p className="font-mono text-[10px] opacity-75 truncate">
                          {item.organization}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ==================== CERTIFICATIONS SECTION (Gray Blog Card Style) ==================== */}
            <div
              id="blog"
              className="section bg-white dark:bg-boxDark rounded-lg px-6 py-8 md:px-8 md:py-10 lg:p-12 shadow-sectionBoxShadow hover:shadow-sectionBoxShadowHover transition ease-out duration-[160ms]"
            >
              <div className="md:w-4/5 lg:w-3/4">
                <h6
                  className="font-mono font-medium uppercase text-sm tracking-wider relative pt-4 mb-5 dark:text-white before:content-['//'] before:pr-2 after:content-[attr(data-backdrop-text)] after:absolute after:top-0 after:left-0 after:font-poppins after:font-bold after:uppercase after:text-4xl after:opacity-15"
                  data-backdrop-text="Certifications"
                >
                  Certifications
                </h6>
                <h2 className="text-3xl lg:text-4xl font-poppins font-semibold mb-3 lg:mb-4 dark:text-white">
                  Certifications &amp; Training
                </h2>
                <p className="text-pColor dark:text-white/70">
                  Industry certifications in MongoDB Database Development, AWS Cloud Practitioner Essentials (Skill Builder), and Java Full Stack Internship.
                </p>
              </div>

              <div className="mt-6 lg:mt-12 space-y-8 md:space-y-6">
                {certificationsData.map((cert) => (
                  <div
                    key={cert.id}
                    className="md:flex md:items-center p-4 rounded-lg border border-black/10 dark:border-white/10 border-dashed"
                  >
                    <div className="overflow-hidden relative rounded-lg group flex-shrink-0">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          alt={cert.title}
                          src={cert.image}
                          className="w-full md:w-[300px] h-[190px] object-cover transition ease-custom duration-500 group-hover:scale-105 group-hover:blur-[1.5px]"
                        />
                        <div className="absolute top-4 left-4 bg-black/45 px-4 py-1.5 rounded-full text-white backdrop-blur-[5px] font-mono font-normal uppercase text-xs tracking-[0.5px]">
                          {cert.category}
                        </div>
                      </a>
                    </div>

                    <div className="mt-5 md:pl-7 md:mt-0 flex-1">
                      <p className="font-mono text-xs uppercase tracking-wider text-pColor dark:text-white/70">
                        {cert.issuer} • {cert.date}
                      </p>
                      <h3 className="font-poppins font-semibold text-xl lg:text-2xl mt-1.5 dark:text-white">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-pColor dark:text-white/70 mt-2 leading-6">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ==================== CONTACT SECTION ==================== */}
            <div
              id="contact"
              className="section bg-white dark:bg-boxDark rounded-lg px-6 py-8 md:px-8 md:py-10 lg:p-12 shadow-sectionBoxShadow hover:shadow-sectionBoxShadowHover transition ease-out duration-[160ms]"
            >
              <div className="md:w-4/5 lg:w-3/4">
                <h6
                  className="font-mono font-medium uppercase text-sm tracking-wider relative pt-4 mb-5 dark:text-white before:content-['//'] before:pr-2 after:content-[attr(data-backdrop-text)] after:absolute after:top-0 after:left-0 after:font-poppins after:font-bold after:uppercase after:text-4xl after:opacity-15"
                  data-backdrop-text="Contact"
                >
                  Get in touch
                </h6>
                <h2 className="text-3xl lg:text-4xl font-poppins font-semibold mb-3 lg:mb-4 dark:text-white">
                  Let&apos;s Connect
                </h2>
                <p className="text-pColor dark:text-white/70">
                  Fill out the form below to send a message directly to{' '}
                  <span className="text-black dark:text-white font-mono">
                    {personalData.email}
                  </span>
                  .
                </p>
              </div>

              <div className="xl:w-11/12 mt-6">
                <ul className="space-y-3">
                  <li className="list-none inline-block px-4 py-2 border border-black/20 border-dashed rounded-full me-2 text-pColor hover:text-black transition ease-linear duration-100 dark:text-white/70 dark:border-white/20 dark:hover:text-white text-sm">
                    <a href={`tel:${personalData.phoneRaw}`}>
                      <i className="bi bi-telephone pe-1.5"></i>
                      Phone: {personalData.phone}
                    </a>
                  </li>
                  <li className="list-none inline-block px-4 py-2 border border-black/20 border-dashed rounded-full me-2 text-pColor hover:text-black transition ease-linear duration-100 dark:text-white/70 dark:border-white/20 dark:hover:text-white text-sm">
                    <a href={`mailto:${personalData.email}`}>
                      <i className="bi bi-envelope pe-1.5"></i>
                      Email: {personalData.email}
                    </a>
                  </li>
                  <li className="list-none inline-block px-4 py-2 border border-black/20 border-dashed rounded-full me-2 text-pColor hover:text-black transition ease-linear duration-100 dark:text-white/70 dark:border-white/20 dark:hover:text-white text-sm">
                    <a
                      href={personalData.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="bi bi-geo-alt pe-1.5"></i>
                      Address: {personalData.address}
                    </a>
                  </li>
                  <li className="list-none inline-block px-4 py-2 border border-black/20 border-dashed rounded-full me-2 text-pColor hover:text-black transition ease-linear duration-100 dark:text-white/70 dark:border-white/20 dark:hover:text-white text-sm">
                    <a
                      href="https://www.linkedin.com/in/abishek-pranav-s-a-110698242/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="bi bi-linkedin pe-1.5"></i>
                      linkedin.com/in/abishekpranav
                    </a>
                  </li>
                </ul>
              </div>

              <form
                id="contactform"
                onSubmit={handleContactSubmit}
                className="space-y-8 mt-8 lg:mt-12"
              >
                <div className="flex flex-col sm:flex-row w-full sm:space-x-4 space-y-8 sm:space-y-0">
                  <div className="w-full sm:w-1/2">
                    <input
                      className="bg-transparent w-full border-b border-black/20 border-dashed pb-4 py-0 text-sm text-black placeholder:text-black/40 transition ease-out duration-[120ms] focus:outline-none focus:border-black dark:text-white dark:placeholder:text-white/50 dark:border-white/20 dark:focus:border-white"
                      type="text"
                      id="name"
                      placeholder="Name"
                      required
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <input
                      className="bg-transparent w-full border-b border-black/20 border-dashed pb-4 py-0 text-sm text-black placeholder:text-black/40 transition ease-out duration-[120ms] focus:outline-none focus:border-black dark:text-white dark:placeholder:text-white/50 dark:border-white/20 dark:focus:border-white"
                      type="email"
                      id="email"
                      placeholder="E-Mail"
                      required
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <input
                  className="w-full bg-transparent border-b border-black/20 border-dashed pb-4 py-0 text-sm text-black placeholder:text-black/40 transition ease-out duration-[120ms] focus:outline-none focus:border-black dark:text-white dark:placeholder:text-white/50 dark:border-white/20 dark:focus:border-white"
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  required
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />

                <textarea
                  className="bg-transparent w-full h-[160px] border-b border-black/20 border-dashed pb-4 py-0 text-sm text-black placeholder:text-black/40 transition ease-out duration-[120ms] focus:outline-none focus:border-black dark:text-white dark:placeholder:text-white/50 dark:border-white/20 dark:focus:border-white"
                  name="message"
                  id="message"
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    className="inline-block bg-black text-white px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wider transition ease-linear duration-100 hover:bg-black/80 dark:bg-white/15 dark:hover:bg-white/25"
                    type="submit"
                    disabled={submitStatus === 'sending'}
                  >
                    {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>

                  {submitStatus === 'success' && (
                    <span className="font-mono text-sm text-green-700 dark:text-emerald-400">
                      ✓ Message sent directly to {personalData.email}!
                    </span>
                  )}

                  {submitStatus === 'mailto_opened' && (
                    <span className="font-mono text-sm text-green-700 dark:text-emerald-400">
                      ✓ Prepared email to {personalData.email} in your mail client!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white dark:bg-boxDark max-w-2xl w-full rounded-lg p-6 md:p-8 shadow-sectionBoxShadowHover border border-black/15 dark:border-white/15 border-dashed max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-black/20 dark:border-white/20 border-dashed text-pColor dark:text-white/70">
                  {selectedProject.category} • {selectedProject.badge}
                </span>
                <h3 className="font-poppins font-semibold text-2xl md:text-3xl mt-3 dark:text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 border-dashed inline-flex items-center justify-center text-xl dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                aria-label="Close modal"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-56 object-cover rounded-lg mb-5"
            />

            <p className="text-pColor dark:text-white/80 leading-7 text-sm mb-5">
              {selectedProject.fullDesc}
            </p>

            <h5 className="font-mono font-medium uppercase text-xs tracking-wider mb-3 dark:text-white">
              // Key Technical Highlights
            </h5>
            <ul className="space-y-2 mb-6">
              {selectedProject.highlights.map((pt) => (
                <li
                  key={pt}
                  className="text-sm text-pColor dark:text-white/75 flex items-start space-x-2"
                >
                  <i className="bi bi-check2-circle text-black dark:text-white mt-0.5"></i>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.techStack.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-3 py-1 rounded-full border border-black/20 dark:border-white/25 border-dashed dark:text-white"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-black/15 dark:border-white/15 border-dashed">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider hover:bg-black/80 dark:bg-white dark:text-black transition"
                >
                  <i className="bi bi-box-arrow-up-right"></i>
                  <span>Open Live Application</span>
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 border border-black dark:border-white border-dashed px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                >
                  <i className="bi bi-github"></i>
                  <span>View GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Grid Lines (Exact Gray Template Background) */}
      <div className="-z-[1] fixed top-0 left-0 overflow-hidden w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-1/4 lg:w-1/5 h-full border-r border-black/10 dark:border-white/15 before:content-[''] before:z-[1] before:absolute before:-top-20 before:-right-[1px] before:w-[1px] before:h-20 before:bg-gradient-to-b before:from-transparent before:to-black/50 dark:before:to-white/50 before:animate-bgLine"></div>
        <div className="absolute top-0 left-0 w-2/4 lg:w-2/5 h-full border-r border-black/10 dark:border-white/15 before:content-[''] before:z-[1] before:absolute before:-top-20 before:-right-[1px] before:w-[1px] before:h-20 before:bg-gradient-to-b before:from-transparent before:to-black/50 dark:before:to-white/50 before:animate-bgLine before:animation-delay-2000"></div>
        <div className="absolute top-0 left-0 w-3/4 lg:w-3/5 h-full border-r border-black/10 dark:border-white/15 before:content-[''] before:z-[1] before:absolute before:-top-20 before:-right-[1px] before:w-[1px] before:h-20 before:bg-gradient-to-b before:from-transparent before:to-black/50 dark:before:to-white/50 before:animate-bgLine before:animation-delay-6000"></div>
        <div className="hidden lg:block absolute top-0 left-0 w-4/5 h-full border-r border-black/10 dark:border-white/15 before:content-[''] before:z-[1] before:absolute before:-top-20 before:-right-[1px] before:w-[1px] before:h-20 before:bg-gradient-to-b before:from-transparent before:to-black/50 dark:before:to-white/50 before:animate-bgLine before:animation-delay-4000"></div>
      </div>
    </div>
  );
}
