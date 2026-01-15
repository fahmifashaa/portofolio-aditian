import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  Cpu, 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  X, 
  ExternalLink, 
  ChevronRight
} from 'lucide-react';

// --- Assets & Data ---

const PORTFOLIO_DATA = {
  name: "Muhammad Aditian Edhiana",
  role: "Manufacture Engineering",
  contact: {
    phone: "085776864535",
    email: "adhitianedh@gmail.com",
    address: "Pucung, Kota Baru, Karawang"
  },
  education: [
    {
      school: "Bandung Manufacturing Polytechnic",
      degree: "Manufacture Engineering",
      year: "Class of 2018",
      desc: "Specialized in precision machining, process optimization, and industrial automation systems."
    }
  ],
  organizations: [
    { name: "Student Executive Board", role: "Head of Logistics" },
    { name: "Robotics Club", role: "Team Leader" },
    { name: "Manufacturing Society", role: "Active Member" },
    { name: "Community Service Div", role: "Field Coordinator" },
    { name: "Industrial Visit Comm", role: "Secretary" },
    { name: "Tech Workshop 2020", role: "Event Manager" }
  ],
  skills: [
    { name: "CAD/CAM (SolidWorks)", type: "Technical" },
    { name: "CNC Programming", type: "Technical" },
    { name: "Team Leadership", type: "Soft Skill" },
    { name: "Process Improvement", type: "Technical" },
    { name: "Problem Solving", type: "Soft Skill" },
    { name: "Tech Support Mgmt", type: "Professional" }
  ],
  projects: [
    {
      id: 1,
      title: "Automated Conveyor System",
      category: "Automation",
      image: "https://placehold.co/600x400/1e293b/fbbf24?text=Conveyor+System",
      details: "Designed and implemented a PLC-based conveyor system that increased assembly line throughput by 25%. Utilized pneumatic actuators and optical sensors."
    },
    {
      id: 2,
      title: "Hydraulic Press Optimization",
      category: "Maintenance",
      image: "https://placehold.co/600x400/1e293b/fbbf24?text=Hydraulic+Press",
      details: "Conducted root cause analysis on press failures. Implemented a preventive maintenance schedule that reduced downtime by 40% annually."
    },
    {
      id: 3,
      title: "Smart Inventory Tracker",
      category: "Logistics",
      image: "https://placehold.co/600x400/1e293b/fbbf24?text=Inventory+Tracker",
      details: "Developed a barcode-based tracking system for the tool crib, reducing lost tool costs and improving checkout speed for technicians."
    },
    {
      id: 4,
      title: "Cafe Workflow Optimization",
      category: "Process Design",
      image: "https://placehold.co/600x400/1e293b/fbbf24?text=Cafe+Workflow",
      details: "Designed the kitchen layout and service flow for 'HAXA by Ayumay', optimizing the preparation line for peak hour orders of Es Teler and Wonton."
    },
    {
      id: 5,
      title: "Team KPI Dashboard",
      category: "Management",
      image: "https://placehold.co/600x400/1e293b/fbbf24?text=KPI+Dashboard",
      details: "Created a visual management dashboard to track technical support team metrics, leading to a 15% improvement in ticket resolution times."
    }
  ]
};

// --- Components ---

const SectionHeader = ({ title, icon: Icon }: { title: string; icon: React.ComponentType<{ size: number }> }) => (
  <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-2">
    <div className="p-2 bg-yellow-500 text-slate-900 rounded-sm">
      <Icon size={20} />
    </div>
    <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-200 font-mono">
      {title}
    </h2>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-800/80 backdrop-blur-sm border-l-4 border-yellow-500 p-6 shadow-xl relative overflow-hidden group ${className}`}>
    <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-40 transition-opacity">
      <div className="w-16 h-1 bg-slate-500 transform rotate-45 translate-x-4 -translate-y-2"></div>
      <div className="w-16 h-1 bg-slate-500 transform rotate-45 translate-x-8 -translate-y-4"></div>
    </div>
    {children}
  </div>
);

const ProjectModal = ({ project, onClose }: { project: typeof PORTFOLIO_DATA.projects[0] | null; onClose: () => void }) => {
  if (!project) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-lg overflow-hidden shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-yellow-500 hover:text-black transition-colors"
        >
          <X size={20} />
        </button>
        
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover opacity-90 border-b-4 border-yellow-500"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-yellow-500 text-xs font-mono tracking-wider uppercase bg-slate-800 px-2 py-1 rounded mb-2 inline-block">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold text-white font-mono">{project.title}</h3>
            </div>
          </div>
          
          <p className="text-slate-300 leading-relaxed mb-6 font-sans">
            {project.details}
          </p>
          
          <button className="w-full py-3 bg-slate-800 hover:bg-yellow-500 hover:text-slate-900 text-yellow-500 border border-yellow-500 transition-all font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-sm">
            View Documentation <ExternalLink size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_DATA.projects[0] | null>(null);
  const [activeTab, setActiveTab] = useState(0); // For mobile indicators
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll snap detection for mobile indicators
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveTab(index);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-yellow-500 selection:text-slate-900 overflow-x-hidden">
      {/* Import Industrial Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .font-mono { font-family: 'Share Tech Mono', monospace; }
        
        /* Hide scrollbar for clean mobile look */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #facc15 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-7xl mx-auto h-screen flex flex-col md:block">
        
        {/* Mobile Header (Fixed) */}
        <header className="md:hidden p-6 pb-2 shrink-0">
          <div className="flex justify-between items-end border-b-2 border-yellow-500 pb-4">
            <div>
              <h1 className="text-3xl font-bold font-mono text-white leading-none">
                MUHAMMAD<br/><span className="text-slate-500">ADITIAN</span>
              </h1>
              <p className="text-yellow-500 text-xs mt-1 tracking-widest uppercase">
                 Engineering & Support
              </p>
            </div>
            <div className="w-12 h-12 bg-slate-800 border border-slate-600 flex items-center justify-center rounded-sm">
               <span className="font-mono text-xl font-bold text-yellow-500">ME</span>
            </div>
          </div>
        </header>

        {/* --- MOBILE VIEW: Horizontal Snap Scroll --- */}
        <div 
          ref={scrollContainerRef}
          className="md:hidden flex-1 flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 pt-4 px-4 gap-4"
        >
          {/* Card 1: Intro & Contact */}
          <section className="snap-center min-w-[90vw] h-full flex flex-col justify-center">
            <Card className="h-full flex flex-col justify-center">
              <div className="mb-8 relative">
                <div className="absolute -left-6 top-0 bottom-0 w-2 bg-yellow-500"></div>
                <h2 className="text-5xl font-mono font-bold text-slate-100 mb-2">HELLO.</h2>
                <p className="text-slate-400">Welcome to my personal portfolio.</p>
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded border border-slate-700">
                  <Phone className="text-yellow-500" size={18} />
                  <span>{PORTFOLIO_DATA.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded border border-slate-700">
                  <Mail className="text-yellow-500" size={18} />
                  <span className="text-xs">{PORTFOLIO_DATA.contact.email}</span>
                </div>
                <div className="flex items-start gap-3 bg-slate-900/50 p-3 rounded border border-slate-700">
                  <MapPin className="text-yellow-500 mt-1" size={18} />
                  <span className="leading-tight">{PORTFOLIO_DATA.contact.address}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                 <div className="h-1 flex-1 bg-yellow-500"></div>
                 <div className="h-1 w-4 bg-slate-600"></div>
                 <div className="h-1 w-2 bg-slate-600"></div>
              </div>
            </Card>
          </section>

          {/* Card 2: Education & Skills */}
          <section className="snap-center min-w-[90vw] h-full overflow-y-auto">
            <Card className="h-full">
              <SectionHeader title="Education" icon={GraduationCap} />
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className="mb-8">
                  <h3 className="text-xl font-bold text-white">{edu.school}</h3>
                  <div className="flex justify-between items-center mt-1 mb-2">
                    <span className="text-yellow-500 font-mono text-sm">{edu.degree}</span>
                    <span className="bg-slate-700 text-xs px-2 py-1 rounded font-mono">{edu.year}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{edu.desc}</p>
                </div>
              ))}

              <SectionHeader title="Skills" icon={Cpu} />
              <div className="grid grid-cols-2 gap-3">
                {PORTFOLIO_DATA.skills.map((skill, idx) => (
                  <div key={idx} className="bg-slate-900 p-3 border-b-2 border-slate-700 hover:border-yellow-500 transition-colors">
                    <p className="text-white font-bold text-sm">{skill.name}</p>
                    <p className="text-slate-500 text-[10px] uppercase font-mono mt-1">{skill.type}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Card 3: Organizations */}
          <section className="snap-center min-w-[90vw] h-full overflow-y-auto">
            <Card className="h-full">
              <SectionHeader title="Organizations" icon={Users} />
              <div className="space-y-4">
                {PORTFOLIO_DATA.organizations.map((org, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-slate-700 rounded bg-slate-900/30">
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm">{org.name}</h4>
                    </div>
                    <span className="text-yellow-500 text-xs font-mono text-right">{org.role}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded text-center">
                 <p className="text-yellow-200 text-sm italic">"Leadership is action, not position."</p>
              </div>
            </Card>
          </section>

          {/* Card 4: Projects */}
          <section className="snap-center min-w-[90vw] h-full overflow-y-auto">
            <Card className="h-full">
              <SectionHeader title="Projects" icon={Wrench} />
              <div className="space-y-4 pb-12">
                {PORTFOLIO_DATA.projects.map((project) => (
                  <motion.div 
                    key={project.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProject(project)}
                    className="group relative h-24 bg-slate-900 border border-slate-700 overflow-hidden flex cursor-pointer"
                  >
                    <div className="w-2 bg-slate-700 group-hover:bg-yellow-500 transition-colors"></div>
                    <div className="w-24 h-full relative overflow-hidden">
                       <img src={project.image} alt="" className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 p-3 flex flex-col justify-center">
                      <h4 className="font-bold text-slate-100 group-hover:text-yellow-400 transition-colors line-clamp-1">{project.title}</h4>
                      <p className="text-xs font-mono text-slate-500 mt-1 uppercase">{project.category}</p>
                    </div>
                    <div className="px-3 flex items-center justify-center text-slate-600 group-hover:text-yellow-500">
                      <ChevronRight size={20} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* Mobile Swipe Indicators */}
        <div className="md:hidden fixed bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none z-20">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${activeTab === i ? 'w-8 bg-yellow-500' : 'w-2 bg-slate-700'}`} 
            />
          ))}
        </div>


        {/* --- DESKTOP VIEW: Grid Layout --- */}
        <div className="hidden md:block p-12 overflow-y-auto min-h-screen">
          <div className="grid grid-cols-12 gap-8 max-w-6xl mx-auto">
            
            {/* Header / Intro Block */}
            <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-12 h-fit">
              <Card className="text-center lg:text-left">
                <div className="w-32 h-32 mx-auto lg:mx-0 bg-slate-900 border-2 border-yellow-500 mb-6 flex items-center justify-center">
                    <span className="font-mono text-4xl font-bold text-slate-700">IMG</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold font-mono text-white mb-2 leading-none">
                  MUHAMMAD<br />ADITIAN<br /><span className="text-slate-500">EDHIANA</span>
                </h1>
                <p className="text-yellow-500 font-mono tracking-widest mt-4 uppercase border-t border-slate-700 pt-4">
                  {PORTFOLIO_DATA.role}
                </p>

                <div className="mt-8 space-y-4 font-mono text-sm text-slate-400">
                  <p className="flex items-center gap-3 hover:text-yellow-500 transition-colors cursor-pointer">
                    <Phone size={16} /> {PORTFOLIO_DATA.contact.phone}
                  </p>
                  <p className="flex items-center gap-3 hover:text-yellow-500 transition-colors cursor-pointer">
                    <Mail size={16} /> {PORTFOLIO_DATA.contact.email}
                  </p>
                  <p className="flex items-start gap-3 hover:text-yellow-500 transition-colors cursor-pointer">
                    <MapPin size={16} className="mt-1" /> {PORTFOLIO_DATA.contact.address}
                  </p>
                </div>

                <div className="mt-8">
                  <button className="w-full bg-yellow-500 text-slate-900 font-bold py-3 uppercase tracking-widest hover:bg-white transition-colors">
                    Download Resume
                  </button>
                </div>
              </Card>
            </div>

            {/* Right Column Content */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              
              {/* Education & Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <SectionHeader title="Education" icon={GraduationCap} />
                  {PORTFOLIO_DATA.education.map((edu, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-bold text-white">{edu.school}</h3>
                      <p className="text-yellow-500 font-mono text-xs my-1">{edu.degree} | {edu.year}</p>
                      <p className="text-slate-400 text-sm mt-2">{edu.desc}</p>
                    </div>
                  ))}
                </Card>

                <Card>
                  <SectionHeader title="Skills" icon={Cpu} />
                  <ul className="grid grid-cols-1 gap-2">
                    {PORTFOLIO_DATA.skills.map((skill, idx) => (
                      <li key={idx} className="flex justify-between items-center border-b border-slate-800 pb-1">
                        <span className="text-slate-300 font-medium">{skill.name}</span>
                        <div className="flex gap-1">
                           {[...Array(5)].map((_, i) => (
                             <div key={i} className={`w-1 h-3 transform skew-x-12 ${i < 4 ? 'bg-yellow-500' : 'bg-slate-700'}`}></div>
                           ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Projects */}
              <Card>
                <SectionHeader title="Selected Projects" icon={Briefcase} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PORTFOLIO_DATA.projects.map((project) => (
                    <motion.div 
                      key={project.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedProject(project)}
                      className="bg-slate-900 border border-slate-700 cursor-pointer group hover:border-yellow-500 transition-all"
                    >
                      <div className="h-32 overflow-hidden relative">
                         <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-transparent transition-colors z-10"></div>
                         <img src={project.image} alt={project.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div className="p-4">
                        <span className="text-yellow-500 text-[10px] font-mono uppercase tracking-wider">{project.category}</span>
                        <h3 className="text-white font-bold mt-1 group-hover:text-yellow-400">{project.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Organization */}
              <Card>
                <SectionHeader title="Organization History" icon={Users} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PORTFOLIO_DATA.organizations.map((org, idx) => (
                    <div key={idx} className="bg-slate-900 p-4 border-l-2 border-slate-600 hover:border-yellow-500 transition-colors">
                      <h4 className="text-slate-200 font-bold text-sm h-10 flex items-center">{org.name}</h4>
                      <p className="text-slate-500 text-xs font-mono uppercase mt-2">{org.role}</p>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </div>
          
          <footer className="max-w-6xl mx-auto mt-12 text-center text-slate-600 font-mono text-xs">
            <p>&copy; {new Date().getFullYear()} Muhammad Aditian Edhiana. Industrial Portfolio.</p>
          </footer>
        </div>

      </main>
    </div>
  );
}